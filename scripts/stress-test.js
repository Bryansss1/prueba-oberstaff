/**
 * STRESS TEST — Conexiones WebSocket simultáneas (sin BD)
 * Uso: node scripts/stress-test.js [jugadores] [segundos]
 *
 * Lee SECRET_KEY y SOCKET_PATH del entorno (process.env),
 * con fallbacks que matchean los defaults del servidor.
 */

// Lee .env para saber SOCKET_PATH y SECRET_KEY (igual que el servidor)
require("dotenv").config();

const { io } = require("socket.io-client");
const jwt = require("jsonwebtoken");

// ── CONFIG ──
const URL      = process.env.SERVER_URL  || "http://localhost:" + (process.env.PORT || "3002");
const PATH     = process.env.SOCKET_PATH || "/socket.io/";
const SECRET   = process.env.SECRET_KEY  || "palabra_secreta";
const PLAYERS  = parseInt(process.argv[2] || "2000", 10);
const HOLD_SEC = parseInt(process.argv[3] || "30", 10);
// ─────────────────────────────────────────────────

let ok = 0, err = 0, disc = 0;
const lat = [], socks = [];
const t0 = Date.now();

function tok(id) {
  return jwt.sign({ id, email: "p" + id + "@t.com" }, SECRET);
}

function show() {
  const elap = ((Date.now() - t0) / 1000).toFixed(1);
  const avg = lat.length ? Math.round(lat.reduce((a, b) => a + b, 0) / lat.length) : 0;
  const mem = Math.round(process.memoryUsage().rss / 1024 / 1024);
  process.stdout.write("\x1b[2J\x1b[H");
  console.log("=".repeat(50));
  console.log("  SOCKET STRESS TEST");
  console.log("=".repeat(50));
  console.log("  Server:  " + URL);
  console.log("  Path:    " + PATH);
  console.log("  Secret:  " + SECRET.substring(0, 4) + "...");
  console.log("-".repeat(50));
  console.log("  OK:      " + ok + " / " + PLAYERS);
  console.log("  Errores: " + err);
  console.log("  Descon:  " + disc);
  console.log("  Tiempo:  " + elap + "s");
  console.log("  Lat avg: " + avg + "ms");
  console.log("  Mem:     " + mem + "MB RSS");
  console.log("=".repeat(50));
}

function one(id) {
  return new Promise((resolve) => {
    const t1 = Date.now();
    let fin = false;

    const s = io(URL, {
      path: PATH,
      auth: { token: tok(id) },
      transports: ["websocket"],
      reconnection: false,
      timeout: 10000,
    });

    const done = (val) => {
      if (fin) return;
      fin = true;
      resolve(val);
    };

    s.on("connect", () => {
      lat.push(Date.now() - t1);
      ok++;
      done(s);
    });

    s.on("connect_error", (e) => {
      err++;
      if (err === 1) console.log("\n  !! PRIMER ERROR: " + e.message);
      s.disconnect();
      done(null);
    });

    s.on("disconnect", () => disc++);

    setTimeout(() => done(null), 10000);
  });
}

async function main() {
  show();

  // Conectar en batches de 100
  for (let i = 0; i < PLAYERS; i += 100) {
    const batch = [];
    for (let j = 0; j < 100 && i + j < PLAYERS; j++) {
      batch.push(one(i + j));
    }
    const res = await Promise.allSettled(batch);
    for (const r of res) {
      if (r.status === "fulfilled" && r.value) socks.push(r.value);
    }
    show();
    await new Promise((r) => setTimeout(r, 50));
  }

  if (ok === 0) {
    console.log("\n  ❌ 0 conexiones. Verificá:");
    console.log("     PATH usado: " + PATH);
    console.log("     PATH del server: revisá .env → SOCKET_PATH=" + (process.env.SOCKET_PATH || "no definido"));
    console.log("     SECRET usado: " + SECRET.substring(0, 4) + "...");
    process.exit(1);
  }

  const elap = ((Date.now() - t0) / 1000).toFixed(1);
  console.log("\n  ✅ " + ok + " conectados en " + elap + "s");
  console.log("  ⏳ Manteniendo " + HOLD_SEC + "s...\n");

  const iv = setInterval(show, 3000);
  await new Promise((r) => setTimeout(r, HOLD_SEC * 1000));
  clearInterval(iv);

  console.log("\n  🛑 Cerrando " + socks.length + " sockets...");
  for (const s of socks) s?.disconnect?.();
  await new Promise((r) => setTimeout(r, 2000));

  const pct = ok === PLAYERS ? "100%" : Math.round((ok / PLAYERS) * 100) + "%";
  const avg = lat.length ? Math.round(lat.reduce((a, b) => a + b, 0) / lat.length) : 0;
  console.log("\n  📊 " + ok + "/" + PLAYERS + " (" + pct + ") | " + err + " err | " + avg + "ms avg\n");

  process.exit(err === 0 ? 0 : 1);
}

main().catch((e) => { console.error("FATAL:", e.message); process.exit(1); });
