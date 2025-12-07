# 🔌 Eventos de Socket.IO

## Índice
1. [Eventos del Cliente → Servidor](#eventos-del-cliente--servidor)
2. [Eventos del Servidor → Cliente](#eventos-del-servidor--cliente)
3. [Ejemplos de Uso](#ejemplos-de-uso)

---

## Eventos del Cliente → Servidor

### 1. `join_bingo`

**Descripción**: El cliente se une a una sala de bingo específica para recibir actualizaciones en tiempo real.

**Payload:**
```typescript
{
  bingoId: number  // ID del bingo al que se desea unir
}
```

**Ejemplo:**
```javascript
socket.emit('join_bingo', { bingoId: 123 });
```

**Respuesta del Servidor**: Emite `bootstrap` de vuelta al cliente.

**Flujo Interno:**
1. Carga el estado del bingo desde la base de datos
2. Agrega el socket a la sala `bingo:123`
3. Emite el evento `bootstrap` con el estado inicial

---

### 2. `claim_bingo`

**Descripción**: El cliente reclama un premio (grita "¡Bingo!") con su cartón.

**Payload:**
```typescript
{
  bingoId: number;           // ID del bingo activo
  boardId: number;           // ID del cartón que reclama
  prize_id: number;          // ID del premio reclamado
  type_of_victory: VictoryType; // Tipo de patrón (ver tipos abajo)
  user: {                    // Información del usuario
    user_id?: number;
    user_email?: string;
    user_names?: string;
    user_last_names?: string;
    user_phone_number?: string;
    user_account_owner_dni?: string;
    user_account_number?: string;
    user_bank_name?: string;
    user_dni?: string;
  };
  boardSnapshot?: any;       // OPCIONAL: Estado actual del cartón
}
```

**Tipos de Victoria (`VictoryType`):**
- `CARTON_LLENO` - Cartón completo marcado
- `LINEA_SIMPLE` - Una línea horizontal o vertical
- `LINEA_DOBLE` - Dos líneas horizontales o verticales
- `CUATRO_ESQUINAS` - Las 4 esquinas del cartón
- `PERIMETRO` - Todo el perímetro del cartón
- `LETRA_H` - Patrón en forma de H
- `NUMERO_7` - Patrón en forma de 7
- `FLECHA` - Patrón en forma de flecha

**Ejemplo:**
```javascript
socket.emit('claim_bingo', {
  bingoId: 123,
  boardId: 456,
  prize_id: 1,
  type_of_victory: 'LINEA_SIMPLE',
  user: {
    user_id: 789,
    user_email: 'jugador@example.com',
    user_names: 'Juan',
    user_last_names: 'Pérez'
  }
});
```

**Respuestas del Servidor:**
- `claim_result` → Indica si el reclamo fue exitoso o rechazado
- `winner_announced` → Broadcast a toda la sala si fue exitoso
- `bingo_finished` → (Opcional) Si fue el último premio

**Validaciones del Servidor:**
1. ✅ El bingo está activo (`is_started: true`)
2. ✅ El premio existe y coincide con el tipo de victoria
3. ✅ El cartón existe, pertenece al bingo y NO es ganador
4. ✅ El patrón de victoria es válido (verificación matemática)

---

## Eventos del Servidor → Cliente

### 1. `bootstrap`

**Descripción**: Enviado cuando un cliente se une a un bingo (después de `join_bingo`).

**Payload:**
```typescript
{
  last5: number[];        // Últimos 5 números sorteados
  prizes: Prize[];        // Lista de premios disponibles
  is_started: boolean;    // Si el bingo está en curso
}
```

**Estructura de `Prize`:**
```typescript
{
  prize_id: number;
  name: string;
  description?: string;
  image?: string;
  type_of_victory: VictoryType;
}
```

**Ejemplo:**
```javascript
socket.on('bootstrap', (data) => {
  console.log('Últimos números:', data.last5);        // [12, 45, 67, 23, 89]
  console.log('Premios disponibles:', data.prizes);   // [{...}, {...}]
  console.log('Bingo iniciado:', data.is_started);    // true
});
```

---

### 2. `number_drawn`

**Descripción**: Broadcast a toda la sala cuando se sortea un nuevo número.

**Frecuencia**: Cada **5 segundos** (mientras el bingo esté activo).

**Payload:**
```typescript
{
  number: number;           // Número sorteado (1-75)
  last5: number[];          // Últimos 5 números (incluyendo este)
  sequenceLength: number;   // Total de números sorteados hasta ahora
}
```

**Ejemplo:**
```javascript
socket.on('number_drawn', (data) => {
  console.log('Nuevo número:', data.number);          // 42
  console.log('Últimos 5:', data.last5);              // [12, 34, 56, 23, 42]
  console.log('Números sorteados:', data.sequenceLength); // 27
  
  // Actualizar UI
  markNumberOnBoard(data.number);
  updateBallDisplay(data.last5);
});
```

---

### 3. `winner_announced`

**Descripción**: Broadcast a toda la sala cuando alguien gana un premio.

**Payload:**
```typescript
{
  boardId: number;           // ID del cartón ganador
  prizeId: number;           // ID del premio ganado
  prizeName: string;         // Nombre del premio
  type_of_victory: VictoryType; // Tipo de patrón
  time: number;              // Timestamp (Date.now())
}
```

**Ejemplo:**
```javascript
socket.on('winner_announced', (data) => {
  console.log(`¡Cartón ${data.boardId} ganó ${data.prizeName}!`);
  
  // Mostrar modal de celebración
  showWinnerModal({
    prize: data.prizeName,
    pattern: data.type_of_victory,
    time: new Date(data.time)
  });
});
```

---

### 4. `claim_result`

**Descripción**: Respuesta directa al cliente que emitió `claim_bingo`.

**Payload (Éxito):**
```typescript
{
  ok: true
}
```

**Payload (Fallo):**
```typescript
{
  ok: false;
  reason: string;  // Motivo del rechazo
}
```

**Razones Posibles:**
- `"Bingo inactivo"` - El bingo no está corriendo
- `"Premio/victoria inválidos"` - El premio no existe o no coincide
- `"Cartón inválido o ya ganador"` - Cartón no existe, ya ganó, o no pertenece a este bingo
- `"Patrón no válido"` - El patrón no cumple con la victoria reclamada
- `"Error interno"` - Error del servidor

**Ejemplo:**
```javascript
socket.on('claim_result', (data) => {
  if (data.ok) {
    alert('¡BINGO! Tu reclamo fue aceptado');
  } else {
    alert(`Reclamo rechazado: ${data.reason}`);
  }
});
```

---

### 5. `bingo_finished`

**Descripción**: Broadcast a toda la sala cuando el bingo termina.

**Triggers:**
- Se reclamaron todos los premios
- Se sortearon los 75 números
- Un administrador detuvo el bingo manualmente

**Payload:**
```typescript
{
  reason: string;  // Motivo de finalización
}
```

**Razones Posibles:**
- `"Sin premios restantes"` - Todos los premios fueron reclamados
- `"Sin números restantes"` - Se agotaron los 75 números
- `"Detenido manualmente"` - Un admin llamó `/bingo/:id/stop`

**Ejemplo:**
```javascript
socket.on('bingo_finished', (data) => {
  console.log('Bingo terminado:', data.reason);
  
  // Deshabilitar interacciones
  disableBoardInteraction();
  showEndScreen(data.reason);
});
```

---

## Ejemplos de Uso

### Cliente Completo (Frontend)

```javascript
import { io } from 'socket.io-client';

// Conectar al servidor
const socket = io('http://localhost:4000');

// Variables de estado
let userBoard = null;
let bingoId = 123;

// ========== EVENTOS ENTRANTES ==========

socket.on('connect', () => {
  console.log('Conectado al servidor');
  
  // Unirse al bingo
  socket.emit('join_bingo', { bingoId });
});

socket.on('bootstrap', (data) => {
  console.log('Estado inicial recibido:', data);
  
  // Renderizar últimos números
  renderLast5(data.last5);
  
  // Mostrar premios disponibles
  renderPrizes(data.prizes);
  
  // Indicar si está en curso
  setBingoStatus(data.is_started);
});

socket.on('number_drawn', (data) => {
  console.log('Nuevo número:', data.number);
  
  // Marcar en el cartón si existe
  if (userBoard && userBoard.hasNumber(data.number)) {
    userBoard.mark(data.number);
  }
  
  // Actualizar display
  updateNumberDisplay(data.number);
  updateLast5(data.last5);
  updateCounter(data.sequenceLength);
});

socket.on('winner_announced', (data) => {
  console.log('Ganador anunciado:', data);
  
  // Mostrar notificación
  showNotification(
    `¡Cartón ${data.boardId} ganó ${data.prizeName}!`,
    'success'
  );
  
  // Si es mi cartón
  if (data.boardId === userBoard?.id) {
    celebrateWin();
  }
});

socket.on('claim_result', (data) => {
  if (data.ok) {
    showNotification('¡Tu reclamo fue aceptado!', 'success');
  } else {
    showNotification(`Reclamo rechazado: ${data.reason}`, 'error');
  }
});

socket.on('bingo_finished', (data) => {
  console.log('Bingo finalizado:', data.reason);
  
  showEndModal(data.reason);
  disableAllInteractions();
});

// ========== EVENTOS SALIENTES ==========

function claimPrize(prizeId, victoryType) {
  const userData = getCurrentUser(); // Tu función para obtener datos del usuario
  
  socket.emit('claim_bingo', {
    bingoId,
    boardId: userBoard.id,
    prize_id: prizeId,
    type_of_victory: victoryType,
    user: {
      user_id: userData.id,
      user_email: userData.email,
      user_names: userData.firstName,
      user_last_names: userData.lastName
    }
  });
}

// ========== HELPERS ==========

function renderLast5(numbers) {
  const container = document.getElementById('last5');
  container.innerHTML = numbers.map(n => 
    `<div class="ball">${n}</div>`
  ).join('');
}

function updateNumberDisplay(number) {
  const ball = document.getElementById('current-ball');
  ball.textContent = number;
  ball.classList.add('animate');
}
```

---

## 🔗 Documentos Relacionados

- [Arquitectura del Sistema](./ARCHITECTURE.md)
- [Patrones de Victoria](./VICTORY_PATTERNS.md)
- [Endpoints REST](./API_ENDPOINTS.md)
