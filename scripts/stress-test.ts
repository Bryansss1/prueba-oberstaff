/**
 * STRESS TEST PURO — Mide capacidad de conexiones WebSocket
 *
 * Uso:
 *   npx tsx scripts/stress-test.ts
 *   npx tsx scripts/stress-test.ts 2000
 *   npx tsx scripts/stress-test.ts 5000 60
 *
 * Args (posicionales):
 *   [0] = cantidad de jugadores (default: 2000)
 *   [1] = segundos manteniendo conexiones (default: 30)
 *
 * NO usa .env. NO toca la base de datos. Solo abre sockets y mide.
 * Usa "palabra_secreta" como JWT secret (el default del servidor).
 * Si tu servidor usa otro secret, pasalo: SECRET_KEY=mi_key npx tsx ...
 */

import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

// ── HARDCODEADO, sin .env ───────────────────────────────
const SERVER_URL = process.env.SERVER_URL || "http://localhost:3002";
const SOCKET_PATH = "/socket.io/";
const SECRET = "palabra_secreta";
const PLAYERS = parseInt(process.argv[2] || "2000", 10);
const HOLD_SEC = parseInt(process.argv[3] || "30", 10);
// ────────────────────────────────────────────────────────

let connected = 0;
let errors = 0;
let disconnects = 0;
const latencies: number[] = [];
const startTime = Date.now();

function token(id: number) {
  return jwt.sign({ id, email: `p${id}@t.com` }, SECRET);
}

function stats() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const avg = latencies.length ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
  const rss = Math.round(process.memoryUsage().rss / 1024 / 1024);

  process.stdout.write("\x1b[2J\x1b[H");
  console.log("═".repeat(45));
  console.log(`  🔌 WebSocket Stress Test`);
  console.log("═".repeat(45));
  console.log(`  Conectados: ${connected} / ${PLAYERS}`);
  console.log(`  Errores:    ${errors}`);
  console.log(`  Desconex:   ${disconnects}`);
  console.log(`  Tiempo:     ${elapsed}s`);
  console.log(`  Latencia:   ${avg}ms avg`);
  console.log(`  Mem:        ${rss} MB RSS`);
  console.log("═".repeat(45));
}

function connect(id: number): Promise<any> {
  return new Promise((resolve) => {
    const t0 = Date.now();
    let done = false;

    const s = io(SERVER_URL, {
      path: SOCKET_PATH,
      auth: { token: token(id) },
      transports: ["websocket"],
      reconnection: false,
      timeout: 10000,
    });

    const finish = (val: any) => {
      if (done) return;
      done = true;
      resolve(val);
    };

    s.on("connect", () => {
      latencies.push(Date.now() - t0);
      connected++;
      finish(s);
    });

    s.on("connect_error", (e: any) => {
      errors++;
      if (errors === 1) console.log(`\n  ⚠️  Primer error: ${e.message}`);
      s.disconnect();
      finish(null);
    });

    s.on("disconnect", () => disconnects++);

    setTimeout(() => finish(null), 10000);
  });
}

async function main() {
  console.log(`\n🚀 ${PLAYERS} conexiones a ${SERVER_URL}`);
  console.log(`   JWT secret: "${SECRET}"\n`);

  // ── Conectar en batches de 100 ──
  const sockets: any[] = [];
  for (let i = 0; i < PLAYERS; i += 100) {
    const batch = [];
    for (let j = 0; j < 100 && i + j < PLAYERS; j++) {
      batch.push(connect(i + j));
    }
    const results = await Promise.allSettled(batch);
    for (const r of results) {
      if (r.status === "fulfilled" && r.value) sockets.push(r.value);
    }
    stats();
    await new Promise((r) => setTimeout(r, 50));
  }

  if (connected === 0) {
    console.log("\n❌ 0 conexiones. Verificá:");
    console.log("   1. ¿El servidor está corriendo en puerto 4000?");
    console.log("   2. ¿El SECRET del servidor es 'palabra_secreta'?");
    console.log("      Si no: SECRET_KEY=tu_secret npx tsx scripts/stress-test.ts");
    process.exit(1);
  }

  // ── Mantener ──
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ ${connected} conectados en ${elapsed}s`);
  console.log(`⏳ Manteniendo ${HOLD_SEC}s...\n`);

  const iv = setInterval(() => stats(), 3000);
  await new Promise((r) => setTimeout(r, HOLD_SEC * 1000));
  clearInterval(iv);

  // ── Cerrar ──
  console.log(`\n🛑 Cerrando...`);
  for (const s of sockets) s?.disconnect?.();
  await new Promise((r) => setTimeout(r, 2000));

  // ── Resultado ──
  const pct = connected === PLAYERS ? "100%" : `${Math.round((connected / PLAYERS) * 100)}%`;
  console.log(`\n📊 ${connected}/${PLAYERS} (${pct}) | ${errors} errores | ${Math.round(latencies.reduce((a,b)=>a+b,0)/latencies.length)}ms avg\n`);
  process.exit(errors === 0 ? 0 : 1);
}

main();
