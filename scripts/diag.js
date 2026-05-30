const { io } = require("socket.io-client");
const jwt = require("jsonwebtoken");

const URL = "http://localhost:3002";
const PATH = "/socket.io/";
const SECRET = "palabra_secreta";

async function diag() {
  const token = jwt.sign({ id: 1, email: "diag@test.com" }, SECRET);
  console.log("Token:", token.substring(0, 40) + "...\n");

  // PRUEBA 1: Transporte por defecto (polling + websocket)
  console.log("1️⃣  Transporte DEFAULT (polling → websocket) ...");
  await new Promise((resolve) => {
    const s = io(URL, {
      path: PATH,
      auth: { token },
      timeout: 10000,
    });
    s.on("connect", () => {
      console.log("   ✅ CONECTADO!\n");
      s.disconnect();
      resolve();
    });
    s.on("connect_error", (e) => {
      console.log("   ❌ " + e.message);
      console.log("   type:", e.type);
      console.log("   desc:", JSON.stringify(e.description || {}));
      s.disconnect();
      resolve();
    });
    setTimeout(() => { console.log("   ❌ Timeout\n"); resolve(); }, 12000);
  });

  // PRUEBA 2: Solo polling
  console.log("2️⃣  Solo POLLING ...");
  await new Promise((resolve) => {
    const s = io(URL, {
      path: PATH,
      auth: { token },
      transports: ["polling"],
      timeout: 10000,
    });
    s.on("connect", () => {
      console.log("   ✅ CONECTADO con polling!\n");
      s.disconnect();
      resolve();
    });
    s.on("connect_error", (e) => {
      console.log("   ❌ " + e.message);
      s.disconnect();
      resolve();
    });
    setTimeout(() => { console.log("   ❌ Timeout\n"); resolve(); }, 12000);
  });

  // PRUEBA 3: Solo websocket (como estaba antes)
  console.log("3️⃣  Solo WEBSOCKET ...");
  await new Promise((resolve) => {
    const s = io(URL, {
      path: PATH,
      auth: { token },
      transports: ["websocket"],
      timeout: 10000,
    });
    s.on("connect", () => {
      console.log("   ✅ CONECTADO con websocket!\n");
      s.disconnect();
      resolve();
    });
    s.on("connect_error", (e) => {
      console.log("   ❌ " + e.message);
      console.log("   type:", e.type);
      s.disconnect();
      resolve();
    });
    setTimeout(() => { console.log("   ❌ Timeout\n"); resolve(); }, 12000);
  });

  console.log("─── Fin ───");
}

diag();
