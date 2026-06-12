# AGENTS.md — Bingo Sockets

> Hybrid REST + Socket.IO server (Express + Socket.IO on one HTTP server). Single-instance, in-memory cache, PostgreSQL via Prisma, Venezuela timezone.

## Setup & Run

```bash
npm install
cp .env.example .env             # Fill DATABASE_URL, SECRET_KEY, BINGO_MODE (and AUTO_START_* — see below)
npx prisma generate              # See "Prisma gotcha" before running
npm run build && node dist/src/index.js   # Recommended
npm run dev                      # nodemon — BROKEN on npm, see "Build & Prisma gotchas" below
```

### ⚠️ Build & Prisma gotchas

- **`npm run dev` is broken.** `nodemon.json` runs `pnpm build` but the repo uses **npm**. Either install pnpm or fix `nodemon.json` `exec` to `npm run build && node dist/src/index.js`. To dev on npm, just run the build+start command in a loop.
- **`build` is `tsc -p .`** (NOT `tsx`). `tsx` exists in `devDependencies` but is not wired into any script — only used manually: `npx tsx scripts/stress-test.ts`.
- **`tsc` emits to `dist/` mirroring `src/`**, so the entry is `dist/src/index.js`, not `dist/index.js` (the `start` script in `package.json` already reflects this).
- **`bun.lockb`** is at the root and gitignored — ignore it.
- **Port is `4000`** as a hardcoded fallback at `src/index.ts:39` (`process.env.PORT || 4000`). It is NOT read from `Config.PORT` (dead — see "Dead code"). Override via `PORT` env.
- **Prisma client is generated to a non-standard path `src/database/prisma/generated/`** AND that folder is **committed to git** (the `/generated/prisma` rule in `.gitignore` doesn't match).
  - The source schema (`src/database/prisma/schema.prisma`) does **NOT** have `output = "generated"`. The copy inside the generated folder DOES.
  - If you re-run `prisma generate` without restoring the `output` line first, the client is regenerated to `node_modules/.prisma/client` and the rest of the app reads **stale** types from the committed folder.
  - **Before running `prisma generate`**: add `output = "generated"` to the source schema's generator block (or point `prisma generate` at the existing folder).
  - All code imports as `import { PrismaClient } from "@prisma/client"` (standard facade, never a deep import).
- **Committed generated client is stale** (e.g. lacks `Bingo.is_pause`). If you need to touch fields added after the last regeneration, run `prisma generate` (writes to `node_modules/.prisma/client/`) — but first do the `output` line restore above, then re-commit the regenerated folder.

### ⚠️ Critical: Incomplete `.env.example`

The committed `.env.example` only ships `DATABASE_URL`, `PORT`, `VERSION`, `SECRET_KEY`, `BINGO_MODE`. The code also reads **`AUTO_START_ENABLED`**, **`BINGO_START_TIME`**, **`BINGO_TIMEZONE`**, **`SCHEDULER_INTERVAL`** (see `src/config/bingo.config.ts`). If `AUTO_START_ENABLED` is missing, the auto-start scheduler silently disables itself (only logs a warning). Add them by hand to your local `.env`.

### ⚠️ Dead code: `src/middlewares/`

The whole `src/middlewares/premiddlewares/` directory (`jwt.middleware.ts`, `admin.middleware.ts`, `zod.middleware.ts`, `morgan.middleware.ts`, `cors.middleware.ts`) and the wrapper in `src/middlewares/index.ts` (`onPreMiddlewares`) are **not wired into `src/index.ts`**. The only middleware actually applied at HTTP level is the bare `app.use(cors()); app.use(express.json())` at the top of `src/index.ts`. Don't add new HTTP routes that depend on `jwtMiddleware`/`adminOnlyMiddleware`/`ZodMiddleware`/`Morgan`/`corsMiddleware` — they will silently do nothing. The only working auth is in `src/config/socket-io.ts` (Socket.IO handshake JWT).

There is no `posmiddlewares/` directory. There is no `src/test/` directory. There is no `migrations/` directory. The schema is pushed/applied directly.

## Architecture

```
src/
  index.ts                        # Entry: Express + http.Server + Socket.IO + scheduler + routes + swagger
  bingo/
    state.ts                      # activeBingos Map<id, BingoState> + loadBingo() + normalizeWinners()
    number-feeder.ts              # setInterval 5s, pushNumber(), createNumberFeeder(), finishBingo()
    verification.ts               # 8 victory patterns (see VictoryType), toMatrix(), areMarkedNumbersPlayed()
    socket-handlers.ts            # join_bingo, claim_bingo (with FOR UPDATE lock + referral join)
    routes.ts                     # GET /bingo/:id, POST /bingo/:id/start|stop (no auth — intentional)
    bingo-scheduler.ts            # 4 cron jobs (see below)
    bingo-manager.ts              # CRUD on Bingo + createBingoFromParameters() + transferUnplayedCardboards()
    types.ts                      # VictoryType = keyof typeof bingo_victories (requires generated client)
  config/
    prisma.ts                     # PrismaClient singleton
    socket-io.ts                  # JWT handshake auth (the only working middleware in prod)
    swagger.ts / swagger-spec.ts  # /api-docs and /api-docs.json
    bingo.config.ts               # BingoGameMode + AUTO_START_* env config
    parameters.ts                 # Parameter cache (refreshed by cron)
  utils/
    config/env.config.ts          # Config object (mostly dead — see above)
    errors/general/               # generalErrorObject helper
    response/general/             # generalResponseObject helper
  database/prisma/
    schema.prisma                 # Source schema
    generated/                    # COMMITTED Prisma client (output = "generated" lives here)
```

### Critical: In-memory state

`activeBingos: Map<number, BingoState>` in `src/bingo/state.ts` is the **only** source of truth at runtime. Every read goes through `loadBingo(bingoId)` which syncs DB → memory. There is no Redis, no shared cache — this is a **single-instance design** that cannot scale horizontally without a refactor.

### Critical: WinnerDTO & referral chain

When a winner is registered via `claim_bingo`, the system fetches referral data through `BingoCardboards → Codes → referred_code` in **one transaction with a join**. The 8 referral fields (`winner_code`, `referred_campaign_ref`, `referred_vip`, `referred_state`, `referred_country_code`, `referred_phone_number`, `referred_master`, `referred_city`) are:
- **stripped** from `winner_announced` broadcast (only public fields go to all players)
- **included** in `claim_result` sent back to the claiming socket
- **persisted** in the `winners` JSON column on the Bingo row

### Critical: `normalizeWinners()`

The `winners` JSON field arrives as `null`, `undefined`, or any shape from the DB. **Always** call `normalizeWinners(winners)` before reading `.data` — it guarantees the `{ data: WinnerDTO[] }` shape. Used in `state.ts`, `socket-handlers.ts`, `verification.ts`. The function takes `any` deliberately because the DB JSON is untyped (see "Type safety gap").

### Critical: Cron jobs (`src/bingo/bingo-scheduler.ts`)

Only registered when `AUTO_START_ENABLED=true`. There are **4 crons** and the timings are:
1. **`*/2 * * * *`** — refresh `parameters` cache; if changed, propagate to pending bingos
2. **`* * * * *`** — check if the last pending bingo should start (resolves start_time from bingo row → DB params → ENV)
3. **`* * * * *`** — post-finish management: create a new bingo if one finished, sync pending bingos with current params
4. **`*/2 * * * *`** — `processExpiredBingos()`: mark pending bingos that never reached min participants as finished and transfer unplayed cardboards (no marks in `bingo_data_json`) to a new/pending bingo

All time math is in **America/Caracas** (Venezuela) via `moment-timezone`.

### Critical: Number feeder modes

- **`BINGO_MODE=PRUEBA`** (default): 1–75 pool, restarts the pool after exhaustion and keeps going. Bingo only ends when `remainingPrizesCount <= 0`.
- **`BINGO_MODE=REAL`**: Stops after 75 unique numbers, then `setTimeout` 5 min → `finishBingo`.

Both modes run on a 5-second `setInterval` in `createNumberFeeder`.

### Critical: Pause / resume via `is_pause` (column on `Bingo`)

The `Bingo.is_pause` column (boolean, default `false`) is the **system-wide pause switch** for the most recent bingo. The operator toggles it from external endpoints (NOT in this repo). When `is_pause=true` on the most recent row:

- **Scheduler** (`bingo-scheduler.ts` `checkAndStartPendingBingos`): early-returns, no auto-start.
- **Expiration** (`bingo-manager.ts` `getExpiredPendingBingos`): skips paused rows; they are never marked finished and never trigger a replacement.
- **New bingo creation** (`createBingoFromParameters`, `checkAndCreateNewBingo`): guarded by `isSystemPaused()` (helper in `bingo-manager.ts` that reads the most recent row's `is_pause`), returns null/no-op while paused.
- **Number feeder** (`number-feeder.ts`): on every 5s tick it re-reads `is_pause` from DB (single `findUnique` with `select: { is_pause: true }`). If true: return early, no number pushed, **interval keeps running** so the next despause is detected within 5s. Any transition to `true` sets `state.was_paused=true` (sticky flag).

`state.was_paused` (in-memory only, on `BingoState` in `types.ts`) is the "operator paused at some point" memory. The scheduler uses it to **bypass expiration** when an operator unpauses after the start window has already expired — instead of finishing + creating a new one, the system just waits for `min_number_of_participants` to arrive and then starts with current time as the effective start time. Resets when a new `BingoState` is created.

The DB column exists in production but the committed `src/database/prisma/generated/` is stale (see "Prisma generator output"). Run `npx prisma generate` (writes to `node_modules/.prisma/client/`) before touching `b.is_pause` in TypeScript — without it, the type is missing and the field will be a compile error.

**Known limitations of the pause feature:**

- **`was_paused` does not survive server restarts.** The flag is in-memory only on `BingoState`. If the server restarts while a bingo is paused, the flag is lost on the next loadBingo. To fix properly would require a DB column. Acceptable for the current single-instance use case.
- **A started bingo paused mid-game can get "stuck" if the operator never unpauses.** In `PRUEBA` mode the feeder waits for winners; in `REAL` mode it waits for 75 numbers. Both depend on numbers being drawn, which the pause blocks. The operator must force-finish from their external endpoint (set `is_finished=true` directly) — the in-repo `/bingo/:id/stop` endpoint also works.
- **Race window (~10-50ms) between the cron's initial `findFirst` and `loadBingo`.** If the operator toggles `is_pause` in that window, the in-memory `state.is_pause` re-check after `loadBingo` catches it and aborts the start. The feeder would have detected the same on its next tick anyway.

### Critical: Server-restart recovery for in-progress bingos

On startup, `startBingoScheduler` scans for bingos with `is_started=true, is_finished=false, deleted_at=null` and re-launches a feeder for each one (including paused ones — their feeder ticks detect `is_pause=true` and stay inert until the operator unpauses). The feeder's `drawn` Set is initialized lazily on the first tick from `state.numbersPlayed.sequence`, so already-drawn numbers are not re-emitted after a restart.

This is what prevents the "stuck bingo" scenario where a server restart would leave a started bingo with no feeder (the 4 crons only process `is_started=false` bingos, so they'd never relaunch a feeder for one that was already in progress). Paused bingos benefit from the same recovery — the feeder runs but does nothing until the operator unpauses, then numbers resume from where they left off.

**Caveat for REAL mode:** the original 5-min finish timer scheduled by the feeder (`setTimeout` after 75 unique numbers) is killed by the restart. After recovery, the bingo will finish 5 min after the restart, not 5 min after the original 75th number. To preserve exact timing, the "finish scheduled at" timestamp would need to be persisted in the DB.

## Database

- **PostgreSQL** via Prisma. Models: `User`, `Codes`, `Parameters`, `Bingo`, `BingoCardboards`, `bingo_prizes`, `live_sessions`, `source_codes`, `referred_code`, plus enums `Role`, `OriginCodes`, `UsedCodeFor`, `OriginSession`, `BingoPrize`, `status`, `bingo_victories`, `estado_victoria_75`.
- **Soft deletes**: every main model has `deleted_at DateTime?`. **Always** include `deleted_at: null` in queries unless you intend to fetch deleted rows.
- `Bingo.winners` and `Bingo.numbers_played` are JSON columns → use `normalizeWinners()` and the `NumbersPlayed` type.
- `live_sessions.created_at` is `@db.Timestamptz(6)` (native PG timestamp with TZ) — be careful when comparing with JS Dates / `DateTime` fields.
- **No migrations** — schema is applied directly from `schema.prisma`. `npx prisma db push` is the workflow.

## Conventions

- ESLint: `@typescript-eslint/no-explicit-any` is **error**, `semi` is **error** (always), `sourceType: "commonjs"`. The lint script is not in `package.json`; run `npx eslint "src/**/*.ts"` to lint. There is **no CI lint gate** — `any` does appear in the source where DB JSON or untyped cardboards are handled (`normalizeWinners`, `toMatrix`, `verifyVictory`, `areMarkedNumbersPlayed`, `isCardboardPlayed`, `compareJsonValues`, JSON writes in `pushNumber`).
- TSConfig: `strict: true`, `module: NodeNext`, `moduleResolution: NodeNext`, `outDir: dist`. Imports use `.js` extensions (e.g. `from "./state.js"`) for ESM compat.
- **Cardboard numbers**: positive = unmarked, **negative = marked**, `0` = FREE (always counted as marked).
- **Victory types** (enum `bingo_victories` / type `VictoryType`): `CARTON_LLENO`, `LINEA_SIMPLE`, `LINEA_DOBLE`, `CUATRO_ESQUINAS`, `PERIMETRO`, `LETRA_H`, `NUMERO_7`, `FLECHA`.

## Socket.IO

- Auth: JWT on handshake — `socket.handshake.auth.token` OR `Authorization: Bearer` header. Verified with `Config.SECRET_KEY`. Without a valid token, connection is refused at the handshake.
- Default path: `/socket.io/`.
- Rooms: `bingo:{id}` (see `roomName()` in `state.ts`).
- **Client events**: `join_bingo`, `claim_bingo`. `claim_bingo` is rate-limited (2s per socket) and runs inside a transaction with `SELECT ... FOR UPDATE` on the cardboard row.
- **Server events**: `bootstrap`, `number_drawn`, `winner_announced`, `claim_result`, `bingo_finished`, `error`.

## REST Endpoints

All intentionally **unauthenticated** for testing:
- `GET  /bingo/:id` — public state (loads into memory if not cached)
- `POST /bingo/:id/start` — start feeder even below min participants
- `POST /bingo/:id/stop` — stop and mark finished
- `GET  /api-docs` / `/api-docs.json` — Swagger UI / OpenAPI spec

## Testing & Stress

- **No tests** — `npm test` is a placeholder (`echo "Error: no test specified" && exit 1`).
- Stress scripts in `scripts/`:
  - `npm run stress` → `node scripts/stress-test.js [players] [seconds]` — connect N sockets to your running server, measure latency. **Reads `.env`**, default port `3002` (wrong — server runs on `4000`).
  - `npm run stress:bingo` → `node scripts/stress-bingo.js [players] [interval_ms]` — spins up its own mini Socket.IO server on port `3099` (no DB) and broadcasts numbers to all clients. Good for capacity testing the socket layer.
  - `npm run stress:500` / `npm run stress:5000` / `npm run stress:bingo:2000` — preset variants.
  - `node scripts/diag.js` — quick diagnostic: tries default, polling-only, and websocket-only transports. Hardcodes port `3002` (also wrong).
  - `npx tsx scripts/stress-test.ts [players] [hold_sec]` — TS variant using `tsx` directly. Hardcodes `SERVER_URL=http://localhost:3002` and `SECRET="palabra_secreta"`. To target a real server, set `SERVER_URL=http://localhost:4000` and `SECRET_KEY` from your `.env`.
- **Footgun**: the JS variants default to port `3002` (an old default that no longer matches the code). The real server is on `4000`. Either fix the args or override `SERVER_URL`/`PORT` per-script.

## Key Docs

`docs/` has per-topic deep dives (ARCHITECTURE, DATABASE, SOCKET_EVENTS, ENV_VARIABLES, VICTORY_PATTERNS, API_ENDPOINTS, SOCKET_EXAMPLES, API_DOCUMENTATION, DOCUMENTATION_INDEX, plus `Bingo_API.postman_collection.json`). **Several docs hardcode the old port `3002` and recommend `prisma migrate dev` / `npm run dev`** — both are wrong (see "Build & Prisma gotchas" and "Stress scripts"). Treat the code as the source of truth.

`README` (root, no extension) is **empty** — there is no project README.
