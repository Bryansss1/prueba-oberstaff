# 📚 Documentación API Bingo - REST & WebSockets

## 🌐 Información General

**Base URL:** `http://localhost:3002`  
**Protocolo WebSocket:** Socket.IO  
**Autenticación:** JWT Bearer Token

---

## 🔐 Autenticación

Todos los endpoints protegidos requieren un token JWT en el header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Para Socket.IO, el token se envía en la conexión:

```javascript
const socket = io("http://localhost:3002", {
  auth: { token: "YOUR_JWT_TOKEN" }
});
```

### Roles de Usuario

El sistema utiliza roles para control de acceso:

- **ADMIN**: Puede iniciar y detener bingos
- **USER**: Puede unirse a bingos y reclamar premios

**Estructura del Token JWT:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "ADMIN",
  "names": "Juan",
  "last_names": "Pérez"
}
```

---

## 📡 REST API Endpoints

### 1. Obtener Estado de Bingo

**Endpoint:** `GET /bingo/:id`  
**Autenticación:** ❌ No requerida (público)  
**Descripción:** Obtiene el estado actual de un bingo específico

**Parámetros URL:**
- `id` (number) - ID del bingo

**Ejemplo Request:**
```bash
GET http://localhost:3002/bingo/1
```

**Respuesta Exitosa (200):**
```json
{
  "bingoId": 1,
  "is_started": true,
  "prizes": [
    {
      "prize_id": 1,
      "name": "Premio 1",
      "description": "Descripción del premio",
      "image": "https://example.com/image.jpg",
      "type_of_victory": "LINEA_SIMPLE"
    }
  ],
  "numbersPlayed": {
    "sequence": [15, 23, 42, 67, 8],
    "last5": [23, 42, 67, 8, 51]
  }
}
```

**Respuesta Error (500):**
```json
{
  "error": "Error al obtener el bingo"
}
```

---

### 2. Iniciar Bingo

**Endpoint:** `POST /bingo/:id/start`  
**Autenticación:** ✅ Requerida (JWT)  
**Autorización:** 🔒 Solo rol **ADMIN**  
**Descripción:** Inicia un bingo y comienza la extracción automática de números cada 5 segundos

**Parámetros URL:**
- `id` (number) - ID del bingo

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Ejemplo Request:**
```bash
POST http://localhost:3002/bingo/1/start
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta Exitosa (200):**
```json
{
  "ok": true
}
```

**Respuesta Error (401):**
```json
{
  "message": "Unauthorized"
}
```

**Respuesta Error (403):**
```json
{
  "message": "Forbidden: Admin access required"
}
```

**Respuesta Error (500):**
```json
{
  "error": "Error al iniciar el bingo"
}
```

---

### 3. Detener Bingo

**Endpoint:** `POST /bingo/:id/stop`  
**Autenticación:** ✅ Requerida (JWT)  
**Autorización:** 🔒 Solo rol **ADMIN**  
**Descripción:** Detiene un bingo manualmente y notifica a todos los jugadores

**Parámetros URL:**
- `id` (number) - ID del bingo

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Ejemplo Request:**
```bash
POST http://localhost:3002/bingo/1/stop
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta Exitosa (200):**
```json
{
  "ok": true
}
```

**Side Effects:**
- Marca el bingo como `is_finished: true` en la base de datos
- Emite evento `bingo_finished` a todos los jugadores conectados

**Respuesta Error (401):**
```json
{
  "message": "Unauthorized"
}
```

**Respuesta Error (403):**
```json
{
  "message": "Forbidden: Admin access required"
}
```

**Respuesta Error (500):**
```json
{
  "error": "Error al detener el bingo"
}
```

---

## 🔌 WebSocket Events (Socket.IO)

### Conexión

**URL:** `http://localhost:3002`  
**Autenticación:** ✅ Requerida (JWT)

**Cliente JavaScript:**
```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3002", {
  auth: {
    token: "YOUR_JWT_TOKEN"
  }
});

socket.on("connect", () => {
  console.log("Conectado:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Error de conexión:", error.message);
  // "Authentication error: No token provided"
  // "Authentication error: Invalid token"
});
```

---

### Eventos del Cliente (Emit)

#### 1. join_bingo

**Descripción:** Unirse a una sala de bingo para recibir actualizaciones en tiempo real

**Payload:**
```javascript
{
  bingoId: number
}
```

**Ejemplo:**
```javascript
socket.emit("join_bingo", { bingoId: 1 });
```

**Respuesta:** Evento `bootstrap` con el estado inicial

---

#### 2. claim_bingo

**Descripción:** Reclamar una victoria cuando el jugador completa un patrón ganador

**Payload:**
```javascript
{
  bingoId: number,
  boardId: number,
  prize_id: number,
  type_of_victory: VictoryType,
  boardSnapshot?: any  // opcional
}
```

**Tipos de Victoria (VictoryType):**
- `"CARTON_LLENO"` - Cartón completo
- `"LINEA_SIMPLE"` - Una línea (horizontal o vertical)
- `"LINEA_DOBLE"` - Dos líneas
- `"CUATRO_ESQUINAS"` - Las 4 esquinas del cartón
- `"PERIMETRO"` - Todo el perímetro del cartón
- `"LETRA_H"` - Forma de letra H
- `"NUMERO_7"` - Forma de número 7
- `"FLECHA"` - Forma de flecha

**Ejemplo:**
```javascript
socket.emit("claim_bingo", {
  bingoId: 1,
  boardId: 123,
  prize_id: 5,
  type_of_victory: "LINEA_SIMPLE"
});
```

**Validaciones:**
- ✅ Usuario autenticado
- ✅ Bingo activo (`is_started: true`)
- ✅ Premio válido y disponible
- ✅ Cartón existe y no ha ganado antes
- ✅ **Cartón pertenece al usuario autenticado**
- ✅ Patrón de victoria es válido

**Respuesta:** Evento `claim_result`

---

### Eventos del Servidor (On)

#### 1. bootstrap

**Descripción:** Enviado al unirse a un bingo, contiene el estado inicial

**Payload:**
```javascript
{
  last5: number[],           // Últimos 5 números cantados
  prizes: Prize[],           // Premios disponibles
  is_started: boolean,       // Si el bingo está activo
  winners: WinnerDTO[]       // Ganadores actuales
}
```

**Ejemplo:**
```javascript
socket.on("bootstrap", (data) => {
  console.log("Estado inicial:", data);
  console.log("Últimos 5 números:", data.last5);
  console.log("Premios:", data.prizes);
  console.log("Bingo iniciado:", data.is_started);
  console.log("Ganadores:", data.winners);
});
```

---

#### 2. number_drawn

**Descripción:** Enviado cuando se canta un nuevo número

**Payload:**
```javascript
{
  number: number,           // Número cantado
  last5: number[],          // Últimos 5 números
  sequenceLength: number    // Total de números cantados
}
```

**Ejemplo:**
```javascript
socket.on("number_drawn", (data) => {
  console.log("Nuevo número:", data.number);
  console.log("Últimos 5:", data.last5);
  console.log("Total cantados:", data.sequenceLength);
  
  // Marcar el número en el cartón
  markNumberOnBoard(data.number);
});
```

---

#### 3. claim_result

**Descripción:** Respuesta a un intento de reclamación de premio

**Payload Exitoso:**
```javascript
{
  ok: true
}
```

**Payload Error:**
```javascript
{
  ok: false,
  reason: string
}
```

**Razones de Error:**
- `"Bingo inactivo"` - El bingo no está iniciado
- `"Premio/victoria inválidos"` - Premio no existe o tipo de victoria incorrecto
- `"Cartón inválido o ya ganador"` - Cartón no existe, ya ganó, o pertenece a otro bingo
- `"No tienes permiso para reclamar este cartón"` - El cartón no pertenece al usuario
- `"Patrón no válido"` - El patrón de victoria no es válido en el cartón
- `"Error interno"` - Error del servidor

**Ejemplo:**
```javascript
socket.on("claim_result", (result) => {
  if (result.ok) {
    console.log("¡Premio reclamado exitosamente!");
  } else {
    console.error("Error al reclamar:", result.reason);
  }
});
```

---

#### 4. winner_announced

**Descripción:** Enviado a todos los jugadores cuando alguien gana

**Payload:**
```javascript
{
  boardId: number,
  prizeId: number,
  prizeName: string,
  type_of_victory: VictoryType,
  time: number,              // Timestamp
  winners: WinnerDTO[]       // Lista actualizada de ganadores
}
```

**Ejemplo:**
```javascript
socket.on("winner_announced", (data) => {
  console.log("¡Nuevo ganador!");
  console.log("Cartón:", data.boardId);
  console.log("Premio:", data.prizeName);
  console.log("Tipo de victoria:", data.type_of_victory);
  console.log("Todos los ganadores:", data.winners);
  
  // Mostrar notificación
  showWinnerNotification(data);
});
```

---

#### 5. bingo_finished

**Descripción:** Enviado cuando el bingo termina (sin premios o detenido manualmente)

**Payload:**
```javascript
{
  reason: string
}
```

**Razones:**
- `"Sin premios restantes"` - Todos los premios fueron ganados
- `"Bingo detenido manualmente por el administrador"` - Admin detuvo el bingo

**Ejemplo:**
```javascript
socket.on("bingo_finished", (data) => {
  console.log("Bingo finalizado:", data.reason);
  
  // Mostrar pantalla de fin de juego
  showGameOverScreen(data.reason);
});
```

---

#### 6. error

**Descripción:** Errores generales del servidor

**Payload:**
```javascript
{
  message: string
}
```

**Ejemplo:**
```javascript
socket.on("error", (data) => {
  console.error("Error del servidor:", data.message);
});
```

---

## 📊 Tipos de Datos

### Prize
```typescript
{
  prize_id: number,
  name: string,
  description?: string,
  image?: string,
  type_of_victory: VictoryType
}
```

### WinnerDTO
```typescript
{
  user_id: number,
  user_email: string,
  user_names: string,
  user_last_names: string,
  user_phone_number?: string,
  user_account_owner_dni?: string,
  user_account_number?: string,
  user_bank_name?: string,
  user_dni?: string,
  prize_id: number,
  prize_name: string,
  prize_description?: string,
  prize_image?: string,
  type_of_victory: VictoryType
}
```

---

## 🎯 Flujo de Uso Completo

### 1. Autenticación
```javascript
// Obtener token JWT (endpoint de tu sistema de auth)
const { token } = await login(email, password);
```

### 2. Conectar Socket.IO
```javascript
const socket = io("http://localhost:3002", {
  auth: { token }
});
```

### 3. Unirse a Bingo
```javascript
socket.emit("join_bingo", { bingoId: 1 });

socket.on("bootstrap", (data) => {
  // Renderizar estado inicial
  renderBingoState(data);
});
```

### 4. Escuchar Números
```javascript
socket.on("number_drawn", (data) => {
  // Marcar número en cartón
  markNumber(data.number);
  
  // Actualizar display
  updateLastNumbers(data.last5);
});
```

### 5. Reclamar Victoria
```javascript
// Cuando el jugador completa un patrón
if (hasWinningPattern()) {
  socket.emit("claim_bingo", {
    bingoId: 1,
    boardId: myBoardId,
    prize_id: availablePrizeId,
    type_of_victory: "LINEA_SIMPLE"
  });
}
```

### 6. Escuchar Resultados
```javascript
socket.on("claim_result", (result) => {
  if (result.ok) {
    showWinnerAnimation();
  } else {
    showError(result.reason);
  }
});

socket.on("winner_announced", (data) => {
  updateWinnersList(data.winners);
});

socket.on("bingo_finished", (data) => {
  showGameOver(data.reason);
});
```

---

## 🔒 Seguridad

**Endpoints Protegidos:**
- `POST /bingo/:id/start` - Solo usuarios con rol **ADMIN**
- `POST /bingo/:id/stop` - Solo usuarios con rol **ADMIN**

**Validaciones Socket.IO:**
- Conexión requiere JWT válido
- `claim_bingo` valida que el cartón pertenezca al usuario

**Recomendaciones:**
- Nunca expongas el token JWT en logs
- Usa HTTPS en producción
- Implementa rate limiting
- Valida siempre en el servidor

---

## 🐛 Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 401 | No autorizado (JWT inválido o ausente) |
| 403 | Prohibido (usuario sin rol ADMIN) |
| 500 | Error interno del servidor |

**Socket.IO:**
- `connect_error` - Error de autenticación o conexión
- Eventos `claim_result` con `ok: false` - Validación fallida
