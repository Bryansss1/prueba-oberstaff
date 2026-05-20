# AGENTS.md — Bingo Sockets

## Setup & Run

```bash
npm install
npx prisma generate          # Required after schema changes; output → src/database/prisma/generated/
cp .env.example .env          # Fill DATABASE_URL, SECRET_KEY, and bingo vars
npm run dev                   # tsx via nodemon → builds then runs dist/src/index.js
```

**Watch out**: `nodemon.json` references `pnpm build` but this repo uses **npm**. If `npm run dev` fails, use `npm run build && node dist/src/index.js` directly. The `bun.lockb` file is gitignored — ignore it.

## Architecture

**Hybrid REST + WebSocket** single-instance server (Express + Socket.IO on same HTTP server).

- `src/index.ts` — Entry point. Wires Express, creates HTTP server, attaches Socket.IO, registers routes, starts scheduler.
- `src/bingo/` — All bingo game logic (state cache, number feeder, victory verification, socket handlers, routes, scheduler).
- `src/config/` — Prisma client singleton, Socket.IO setup (JWT auth on handshake), Swagger, bingo auto-start config, parameter caching.
- `src/middlewares/` — Pre/Post middleware pattern. `premiddlewares/` has JWT, admin-only, Zod validation, CORS, Morgan. `posmiddlewares/` is empty.
- `src/utils/` — Env config, error/response helpers.
- `src/database/prisma/schema.prisma` — Prisma schema (PostgreSQL).

### Critical: In-Memory State

**`activeBingos: Map<number, BingoState>`** in `src/bingo/state.ts` holds all running bingo state. This is a **single-instance design** — no Redis, no shared cache. Every read of bingo state goes through `loadBingo(bingoId)` which syncs DB → memory.

### Critical: WinnerDTO & Referral Data

When a winner is registered via `claim_bingo`, the system fetches referral data through the chain: **BingoCardboards → Codes → referred_code**. The `WinnerDTO` type includes 8 optional referral fields: `winner_code`, `referred_campaign_ref`, `referred_vip`, `referred_state`, `referred_country_code`, `referred_phone_number`, `referred_master`, `referred_city`. This data is included in both `winner_announced` (Socket.IO) and the `winners` JSON stored in DB.

### Critical: `normalizeWinners()`

The `winners` JSON field in the `Bingo` table can arrive as `null` or malformed from the DB. **Always** call `normalizeWinners(winners)` before reading `winners.data`. This ensures the structure `{ data: WinnerDTO[] }` is always present. Used in `state.ts`, `socket-handlers.ts`, and `verification.ts`.

## Database

- **PostgreSQL** via Prisma. Schema: `src/database/prisma/schema.prisma`
- Prisma client generated to `src/database/prisma/generated/` (non-standard — not in `node_modules/.prisma`)
- **Soft deletes**: All main models have `deleted_at DateTime?`. Always include `deleted_at: null` in queries unless intentionally fetching deleted records.
- **`@db.Timestamptz(6)`** on `live_sessions.created_at` — native PG timestamps, be aware of timezone handling.

## Bingo Game Modes

- **`BINGO_MODE=PRUEBA`** (default): Numbers 1–75 repeat indefinitely after pool exhaustion. Bingo only ends when all prizes are claimed.
- **`BINGO_MODE=REAL`**: After 75 unique numbers are drawn, waits 5 minutes then auto-finishes.

## Cron Jobs (node-cron)

Registered in `src/bingo/bingo-scheduler.ts` when `AUTO_START_ENABLED=true`:
1. **Every 2min**: Refresh parameters cache from DB. If changed, update pending bingos.
2. **Every 1min**: Check if it's time to auto-start the last pending bingo (respects `start_time` from bingo row > DB params > ENV).
3. **Every 3min**: Post-finish management — create new bingo if one finished, sync pending bingos with params.
4. **Every 2min**: Process expired bingos (didn't reach min participants in start window). Marks finished, transfers unplayed cardboards.

## Socket.IO

- Auth via JWT on handshake (`socket.handshake.auth.token` or `Authorization: Bearer` header).
- Rooms: `bingo:{id}` (one per bingo game).
- Events documented in `docs/SOCKET_EVENTS.md` and exposed in Swagger at `/api-docs`.

## REST Endpoints

- `GET /bingo/:id` — Public bingo state
- `POST /bingo/:id/start` — No auth required (intentionally, for testing)
- `POST /bingo/:id/stop` — No auth required (intentionally, for testing)
- Swagger UI: `/api-docs`, OpenAPI JSON: `/api-docs.json`

## Conventions

- **ESLint**: `@typescript-eslint/no-explicit-any` is an **error**. Do not use `any`. Semicolons required.
- **TSConfig**: `strict: true`, `module: NodeNext`, `moduleResolution: NodeNext`. Imports need `.js` extensions for ESM compat.
- **Cardboard numbers**: Positive = unmarked, **Negative = marked**, `0` = FREE cell (always marked).
- **Victory types**: `CARTON_LLENO`, `LINEA_SIMPLE`, `LINEA_DOBLE`, `CUATRO_ESQUINAS`, `PERIMETRO`, `LETRA_H`, `NUMERO_7`, `FLECHA` (enum `bingo_victories` in Prisma).
- **No tests exist**. `src/test/` is empty. `npm test` is a no-op placeholder.

## Key Docs

- `docs/ARCHITECTURE.md` — Full system design with mermaid diagrams
- `docs/DATABASE.md` — Schema, JSON field structures, relationships
- `docs/SOCKET_EVENTS.md` — All Socket.IO events with payloads
- `docs/ENV_VARIABLES.md` — Environment variables and auto-start config
- `docs/VICTORY_PATTERNS.md` — Victory pattern verification logic
- `docs/API_ENDPOINTS.md` — REST API reference
- `docs/DOCUMENTATION_INDEX.md` — Quick-start guide
