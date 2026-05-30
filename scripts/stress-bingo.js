/**
 * STRESS TEST COMPLETO — Simula un bingo REAL sin base de datos
 *
 * Qué hace:
 *   1. Levanta un mini-servidor Socket.IO (sin BD, sin Express)
 *   2. Conecta N clientes, todos emiten join_bingo
 *   3. Cada 1s (configurable) "canta" un número y lo broadcast a la sala
 *   4. Mide latencia: tiempo desde que el server emite hasta que CADA cliente recibe
 *
 * Uso:
 *   node scripts/stress-bingo.js [jugadores] [intervalo_ms]
 *   node scripts/stress-bingo.js 2000 1000
 */

const http = require("http");
const { Server } = require("socket.io");
const { io } = require("socket.io-client");
const jwt = require("jsonwebtoken");

// ── CONFIG ──
const PORT = 3099; // puerto del servidor de prueba
const SECRET = "test_secret";
const PLAYERS = parseInt(process.argv[2] || "500", 10);
const INTERVAL_MS = parseInt(process.argv[3] || "1000", 10); // cada cuánto "cantar"
const TOTAL_NUMBERS = parseInt(process.argv[4] || "75", 10); // cuántos números cantar
// ─────────────

// ═══════════════════════════════════════════════════════
//  MINI SERVIDOR DE BINGO (sin BD)
// ═══════════════════════════════════════════════════════
function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer();
    const sio = new Server(srv, { cors: { origin: "*" } });

    // JWT auth (igual que el server real)
    sio.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("No token"));
        const dec = jwt.verify(token, SECRET);
        socket.data.user = { id: dec.id, email: dec.email };
        next();
      } catch {
        next(new Error("Invalid token"));
      }
    });

    // Manejar join_bingo
    sio.on("connection", (socket) => {
      socket.on("join_bingo", ({ bingoId }) => {
        socket.join("bingo:" + bingoId);
      });
    });

    srv.listen(PORT, () => resolve({ srv, sio }));
  });
}

// ═══════════════════════════════════════════════════════
//  CLIENTES
// ═══════════════════════════════════════════════════════
const BINGO_ID = 1;
const URL = "http://localhost:" + PORT;

const receivedMap = new Map(); // clientId → timestamp cuando recibió el último número
const latencies = []; // todas las latencias

function tok(id) {
  return jwt.sign({ id, email: "p" + id + "@t.com" }, SECRET);
}

function createClient(id) {
  return new Promise((resolve) => {
    const s = io(URL, {
      auth: { token: tok(id) },
      transports: ["websocket"],
      timeout: 10000,
    });

    s.on("connect", () => {
      // Unirse al bingo
      s.emit("join_bingo", { bingoId: BINGO_ID });

      // Escuchar números cantados
      s.on("number_drawn", (data) => {
        const now = Date.now();
        const serverTs = data.ts;
        if (serverTs) {
          latencies.push(now - serverTs);
        }
        receivedMap.set(id, now);
      });

      resolve(s);
    });

    s.on("connect_error", () => {
      resolve(null);
    });

    setTimeout(() => resolve(null), 10000);
  });
}

// ═══════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════
async function main() {
  console.log("\n🚀 Iniciando servidor de prueba en puerto " + PORT + "...");
  const { srv, sio } = await startServer();
  console.log("✅ Servidor listo\n");

  // ── Conectar clientes ──
  console.log("🔌 Conectando " + PLAYERS + " clientes...");
  const t0 = Date.now();
  const clients = [];

  for (let i = 0; i < PLAYERS; i += 100) {
    const batch = [];
    for (let j = 0; j < 100 && i + j < PLAYERS; j++) {
      batch.push(createClient(i + j));
    }
    const res = await Promise.allSettled(batch);
    for (const r of res) {
      if (r.status === "fulfilled" && r.value) clients.push(r.value);
    }
    process.stdout.write("\r   " + clients.length + " / " + PLAYERS);
    const mem = Math.round(process.memoryUsage().rss / 1024 / 1024);
    if (clients.length % 500 === 0) process.stdout.write(" [" + mem + "MB]");
    await new Promise((r) => setTimeout(r, 30));
  }

  const connectTime = ((Date.now() - t0) / 1000).toFixed(1);
  console.log("\n✅ " + clients.length + " clientes conectados en " + connectTime + "s\n");

  // ── Cantar números ──
  console.log("🎱 Cantando " + TOTAL_NUMBERS + " números cada " + INTERVAL_MS + "ms...\n");
  console.log(" Núm |  Recibido  | Promedio |  P50  |  P99  | Perdidos");
  console.log("-----|------------|----------|-------|-------|----------");

  const numbersCalled = [];

  for (let n = 1; n <= TOTAL_NUMBERS; n++) {
    const num = Math.floor(Math.random() * 75) + 1;
    numbersCalled.push(num);

    // Limpiar mediciones del número anterior
    const snapshot = [...latencies];
    latencies.length = 0;
    let lostBefore = clients.length - receivedMap.size;

    // Broadcast con timestamp del servidor
    const ts = Date.now();
    sio.to("bingo:" + BINGO_ID).emit("number_drawn", {
      number: num,
      ts, // timestamp para medir latencia
      sequenceLength: numbersCalled.length,
    });

    // Esperar el intervalo
    await new Promise((r) => setTimeout(r, INTERVAL_MS));

    // Calcular stats
    const received = receivedMap.size;
    const lost = clients.length - received;
    const avg = snapshot.length ? Math.round(snapshot.reduce((a, b) => a + b, 0) / snapshot.length) : 0;
    const sorted = [...snapshot].sort((a, b) => a - b);
    const p50 = sorted.length ? sorted[Math.floor(sorted.length * 0.5)] : 0;
    const p99 = sorted.length ? sorted[Math.floor(sorted.length * 0.99)] : 0;

    console.log(
      " " + String(num).padStart(3) + " | " +
      String(received).padStart(8) + " | " +
      String(avg).padStart(6) + "ms | " +
      String(p50).padStart(4) + "ms | " +
      String(p99).padStart(4) + "ms | " +
      String(lost)
    );
  }

  // ── Resultado final ──
  const allLats = [...latencies];
  const avgAll = allLats.length ? Math.round(allLats.reduce((a, b) => a + b, 0) / allLats.length) : 0;
  const sortedAll = [...allLats].sort((a, b) => a - b);
  const p50All = sortedAll.length ? sortedAll[Math.floor(sortedAll.length * 0.5)] : 0;
  const p99All = sortedAll.length ? sortedAll[Math.floor(sortedAll.length * 0.99)] : 0;

  console.log("\n📊 RESULTADO FINAL (" + PLAYERS + " clientes, " + TOTAL_NUMBERS + " broadcasts):");
  console.log("   Latencia avg:  " + avgAll + "ms");
  console.log("   Latencia p50:  " + p50All + "ms");
  console.log("   Latencia p99:  " + p99All + "ms");
  console.log("   Total samples: " + allLats.length);

  // ── Cleanup ──
  console.log("\n🛑 Cerrando...");
  for (const c of clients) c?.disconnect?.();
  await new Promise((r) => setTimeout(r, 1000));
  sio.close();
  srv.close();
  console.log("Listo.\n");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
