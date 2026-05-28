# AGENTS.md — Bingo Sockets

## Setup & Run

```bash
npm install
npx prisma generate          # ⚠️ See Prisma gotcha below
cp .env.example .env         # Fill DATABASE_URL, SECRET_KEY, and bingo vars
npm run build && node dist/src/index.js   # Recommended (see watch-out below)
npm run dev                  # nodemon — but buggy (see watch-out)
```

### ⚠️ Watch Out: Dev & Build

- **`nodemon.json` references `pnpm build`** but this repo uses **npm**. `npm run dev` will fail unless you fix it or install pnpm. The safe way: `npm run build && node dist/src/index.js`.
- **`build` is `tsc -p .`** (TypeScript compiler), NOT tsx. The `tsx` dep exists in `package.json` but is not wired into any script.
- The `bun.lockb` file is gitignored — ignore it.
- Port defaults to **4000** (set in `src/index.ts`, NOT from `Config.PORT` which defaults to 3000).

### ⚠️ Critical: Prisma Generator Output

The Prisma client is generated to **`src/database/prisma/generated/`** (non-standard). The **source schema** at `src/database/prisma/schema.prisma` does NOT have the `output` field in its generator block, but the **generated schema copy** at `src/database/prisma/generated/schema.prisma` does: `output = "generated"`. This means someone generated with `output = "generated"` set, then removed it from the source. If you re-run `prisma generate` without adding it back, the client will be generated to the default `node_modules/.prisma/client` and the app will use stale code. **Always verify the generator block has `output = "generated"` before running `prisma generate`.**

All code imports Prisma via `import { PrismaClient } from "@prisma/client"` — standard facade, NOT a direct path import.

### No Migrations

The `migrations/` directory exists but is **empty**. DB schema is managed by Prisma schema only (`src/database/prisma/schema.prisma`). There is no migration history to apply — you work directly against the schema.

## Architecture

**Hybrid REST + WebSocket** single-instance server (Express + Socket.IO on same HTTP server).

- `src/index.ts` — Entry point. Wires Express, creates HTTP server, attaches Socket.IO, registers routes, starts scheduler.
- `src/bingo/` — All bingo game logic: `state.ts` (in-memory cache + `loadBingo` + `normalizeWinners`), `number-feeder.ts` (5-sec interval), `verification.ts` (8 victory patterns), `socket-handlers.ts`, `routes.ts`, `bingo-scheduler.ts`, `bingo-manager.ts` (CRUD + cardboard transfer), `types.ts`.
- `src/config/` — Prisma client singleton, Socket.IO JWT auth setup, Swagger, bingo auto-start config, parameter caching.
- `src/middlewares/` — Pre/Post pattern. `premiddlewares/` has JWT, admin-only, Zod validation, CORS, Morgan. `posmiddlewares/` is empty.
- `src/utils/` — Env config (`Config` object), error/response helpers.

### Critical: In-Memory State

**`activeBingos: Map<number, BingoState>`** in `src/bingo/state.ts` holds all running bingo state. This is a **single-instance design** — no Redis, no shared cache. Every read of bingo state goes through `loadBingo(bingoId)` which syncs DB → memory. The scheduler, routes, and socket handlers all mutate this same Map.

### Critical: WinnerDTO & Referral Chain

When a winner is registered via `claim_bingo`, the system fetches referral data through: **BingoCardboards → Codes → referred_code**. The `WinnerDTO` type includes 8 referral fields (`winner_code`, `referred_campaign_ref`, `referred_vip`, `referred_state`, `referred_country_code`, `referred_phone_number`, `referred_master`, `referred_city`). This data is included in:
- `winner_announced` broadcast → **referral fields are STRIPPED** (only public WinnerDTO fields sent to all players)
- `claim_result` → full referral data returned **only to the claiming socket**
- `winners` JSON stored in DB → full data persisted

### Critical: `normalizeWinners()`

The `winners` JSON field in the `Bingo` table can arrive as `null`, `undefined`, or any structure from the DB. **Always** call `normalizeWinners(winners)` before reading `winners.data`. This ensures the structure `{ data: WinnerDTO[] }` is always present. Used in `state.ts`, `socket-handlers.ts`, and `verification.ts`. **Note**: this function accepts `any` despite the ESLint rule (necessary because DB JSON can be anything).

## Database

- **PostgreSQL** via Prisma. Schema: `src/database/prisma/schema.prisma`
- Prisma client generated to `src/database/prisma/generated/` (non-standard — see gotcha above)
- **Soft deletes**: All main models have `deleted_at DateTime?`. Always include `deleted_at: null` in queries unless intentionally fetching deleted records.
- **`@db.Timestamptz(6)`** on `live_sessions.created_at` — native PG timestamps; be aware of timezone handling.
- Key models: `User`, `Codes`, `Parameters`, `Bingo`, `BingoCardboards`, `referred_code`

## Bingo Game Modes

- **`BINGO_MODE=PRUEBA`** (default): Numbers 1–75 repeat indefinitely after pool exhaustion. Bingo only ends when all prizes are claimed (`remainingPrizesCount <= 0`).
- **`BINGO_MODE=REAL`**: After all 75 unique numbers are drawn, waits 5 minutes then auto-finishes via `setTimeout` in the number feeder.

## Number Feeder

Runs at **5-second intervals** (`setInterval` at 5000ms in `createNumberFeeder`). In PRUEBA mode, when the pool of 75 is exhausted, it clears `drawn` and repeats. In REAL mode, it stops after 75 unique numbers and sets a 5-min `setTimeout` to call `finishBingo`.

## Cron Jobs (node-cron)

Registered in `src/bingo/bingo-scheduler.ts` when `AUTO_START_ENABLED=true`:
1. **Every 2min**: Refresh parameters cache from DB. If changed, update pending bingos.
2. **Every 1min**: Check if it's time to auto-start the last pending bingo (respects `start_time` from bingo row > DB params > ENV).
3. **Every 3min**: Post-finish management — create new bingo if one finished, sync pending bingos with params.
4. **Every 2min**: Process expired bingos (didn't reach min participants in start window). Marks them finished, transfers unplayed cardboards to a new/pending bingo.

Timezone: **America/Caracas** (Venezuela). All `moment-timezone` operations use this.

## Socket.IO

- Auth via JWT on handshake (`socket.handshake.auth.token` or `Authorization: Bearer` header). Requires `SECRET_KEY` env var.
- Socket path: `Config.SOCKET_PATH` (default `/socket.io/`).
- Rooms: `bingo:{id}` (one per bingo game), managed by `roomName()` in `state.ts`.
- Key client events: `join_bingo`, `claim_bingo`.
- Key server events: `bootstrap`, `number_drawn`, `winner_announced`, `claim_result`, `bingo_finished`, `error`.
- Events documented in `docs/SOCKET_EVENTS.md` and exposed in Swagger at `/api-docs`.

## REST Endpoints

- `GET /bingo/:id` — Public bingo state (loads state into memory if not cached)
- `POST /bingo/:id/start` — No auth required (intentionally, for testing). Starts number feeder even if participant count is below minimum.
- `POST /bingo/:id/stop` — No auth required (intentionally, for testing)
- Swagger UI: `/api-docs`, OpenAPI JSON: `/api-docs.json`

## Conventions

- **ESLint**: `@typescript-eslint/no-explicit-any` is an **error**. Do not use `any`. Semicolons required via `"semi": ["error", "always"]`. Source type is `commonjs`.
- **TSConfig**: `strict: true`, `module: NodeNext`, `moduleResolution: NodeNext`. Imports need `.js` extensions for ESM compat (e.g., `import { foo } from "./bar.js"`).
- **Cardboard numbers**: Positive = unmarked, **Negative = marked**, `0` = FREE cell (always marked).
- **Victory types** (enum `bingo_victories`, type `VictoryType`): `CARTON_LLENO`, `LINEA_SIMPLE`, `LINEA_DOBLE`, `CUATRO_ESQUINAS`, `PERIMETRO`, `LETRA_H`, `NUMERO_7`, `FLECHA`.
- **Type safety gap**: Despite the `no-explicit-any` rule, several critical functions use `any` for JSON/board payloads: `normalizeWinners()`, `toMatrix()`, `verifyVictory()`, `isCardboardPlayed()`. This is intentional (DB JSON is untyped) but be aware when touching these.
- **No tests exist**. `src/test/` is empty. `npm test` is a no-op placeholder (`echo "Error: no test specified" && exit 1`).
- **`@prisma/client` usage**: The `VictoryType` type in `types.ts` derives from `bingo_victories` enum via `keyof typeof bingo_victories` — this requires the Prisma client to be generated before TypeScript compilation.

## Key Docs

- `docs/ARCHITECTURE.md` — Full system design with mermaid diagrams
- `docs/DATABASE.md` — Schema, JSON field structures, relationships
- `docs/SOCKET_EVENTS.md` — All Socket.IO events with payloads
- `docs/ENV_VARIABLES.md` — Environment variables and auto-start config
- `docs/VICTORY_PATTERNS.md` — Victory pattern verification logic
- `docs/API_ENDPOINTS.md` — REST API reference
- `docs/DOCUMENTATION_INDEX.md` — Quick-start guide
