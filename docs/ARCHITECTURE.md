# 🏗️ Arquitectura del Sistema de Bingo

## Índice
1. [Visión General](#visión-general)
2. [Componentes del Sistema](#componentes-del-sistema)
3. [Flujo de Datos Detallado](#flujo-de-datos-detallado)
4. [Sistema de Caché](#sistema-de-caché)
5. [Gestión de Salas](#gestión-de-salas)
6. [Ciclo de Vida de un Bingo](#ciclo-de-vida-de-un-bingo)

---

## Visión General

El sistema está diseñado con una arquitectura **híbrida REST + WebSocket**, donde:

- **REST API**: Control administrativo (iniciar/detener bingo, consultar estado)
- **WebSocket (Socket.IO)**: Eventos en tiempo real (números sorteados, ganadores, bootstrapping)

### Principios de Diseño

1. **Baja Latencia**: Caché en memoria para estado activo de bingos
2. **Persistencia**: Todas las operaciones críticas se persisten en PostgreSQL
3. **Escalabilidad**: Uso de salas de Socket.IO para broadcast eficiente
4. **Validación Server-Side**: Toda lógica de victoria se valida en el servidor

---

## Componentes del Sistema

### 1. **Servidor HTTP y WebSocket**

```typescript
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
```

- **Express**: Maneja endpoints REST
- **http.Server**: Servidor HTTP nativo de Node.js
- **Socket.IO**: Capa WebSocket sobre HTTP

### 2. **Cliente Prisma**

```typescript
const prisma = new PrismaClient();
```

- ORM para PostgreSQL
- Maneja modelos: `Bingo`, `BingoCardboards`, `User`, `Codes`, `Parameters`

### 3. **Caché de Estado (`activeBingos`)**

```typescript
const activeBingos = new Map<number, BingoState>();
```

**Estructura de `BingoState`:**
```typescript
type BingoState = {
  id: number;
  is_started: boolean;
  prizes: Prize[];              // Lista de premios configurados
  numbersPlayed: NumbersPlayed; // Historial de números
}
```

### 4. **Sistema de Sorteo Automático**

```typescript
function createNumberFeeder(bingoId: number): NodeJS.Timer
```

- Intervalo de **5 segundos** entre números
- Genera números del **1 al 75** sin repetición
- Se detiene cuando se agotan números o el bingo se detiene

### 5. **Sistema de Parámetros Dinámicos**

```typescript
// Caché de parámetros
let cachedParameters: Parameters | null = null;

// Funciones principales
getCurrentParameters(): Promise<Parameters | null>
refreshParametersCache(): Promise<boolean>
```

- Parámetros se cachean en memoria
- Se refrescan cada 2 minutos desde BD
- `start_time` ahora viene de BD (formato HH:mm en hora Venezuela)
- Fallback a variables de entorno si no hay parámetros en BD

### 6. **Sistema de Auto-Start con Hora del Último Bingo**

```typescript
// Verifica hora del último bingo pendiente
async function isTimeToStart(bingoStartTime?: string | null): Promise<boolean>
async function checkAndStartPendingBingos(io: Server): Promise<void>
```

- **Comportamiento**: El auto-start usa la hora (`start_time`) del **último bingo pendiente creado**
- Solo un bingo puede iniciarse por día
- Si el último bingo no tiene `start_time`, usa parámetros o ENV como fallback
- Verifica cada minuto si es hora de iniciar el último bingo pendiente

### 7. **Normalización de Estructura de Winners**

```typescript
// Función helper para normalizar winners
export function normalizeWinners(winners: any): { data: WinnerDTO[] }
```

- Garantiza que el campo `winners` siempre tenga la estructura `{ data: WinnerDTO[] }`
- Maneja casos donde `winners` es `null`, `undefined`, o tiene estructura incorrecta
- Se usa en todos los lugares donde se lee o escribe `winners` desde/hacia la BD
- Previene errores por estructuras inconsistentes

### 8. **Gestión Automática de Bingos**

```typescript
// Funciones principales
createBingoFromParameters(): Promise<number | null>
updatePendingBingosFromParameters(): Promise<void>
checkAndCreateNewBingo(): Promise<void>
processExpiredBingos(): Promise<void>
transferUnplayedCardboards(oldBingoId, newBingoId): Promise<number>
```

- Crea bingos automáticamente con últimos parámetros
- Actualiza bingos pendientes cuando cambian parámetros
- Detecta y procesa bingos expirados
- Transfiere cartones no jugados entre bingos

---

## Flujo de Datos Detallado

### Diagrama de Flujo: Inicio de Bingo

```mermaid
sequenceDiagram
    participant Admin
    participant REST API
    participant Base de Datos
    participant Caché
    participant Timer

    Admin->>REST API: POST /bingo/:id/start
    REST API->>Base de Datos: loadBingo(id)
    Base de Datos-->>Caché: Cargar estado
    Caché-->>REST API: BingoState
    REST API->>Base de Datos: UPDATE is_started = true
    REST API->>Timer: createNumberFeeder(id)
    Timer-->>REST API: Interval handle
    REST API-->>Admin: { ok: true }
    
    loop Cada 5 segundos
        Timer->>Caché: Obtener estado
        Timer->>Timer: Generar número aleatorio
        Timer->>Base de Datos: Persistir número
        Timer->>Socket.IO: Emit 'number_drawn'
    end
```

### Diagrama de Flujo: Jugador se Une

```mermaid
sequenceDiagram
    participant Cliente
    participant Socket.IO
    participant Caché
    participant Base de Datos

    Cliente->>Socket.IO: emit('join_bingo', {bingoId})
    Socket.IO->>Base de Datos: loadBingo(bingoId)
    Base de Datos-->>Caché: Cargar/Actualizar estado
    Socket.IO->>Socket.IO: socket.join('bingo:X')
    Socket.IO->>Cliente: emit('bootstrap', {last5, prizes, is_started})
```

### Diagrama de Flujo: Reclamación de Premio

```mermaid
sequenceDiagram
    participant Cliente
    participant Socket.IO
    participant Validador
    participant Base de Datos
    participant Sala

    Cliente->>Socket.IO: emit('claim_bingo', payload)
    Socket.IO->>Caché: Obtener estado
    Socket.IO->>Socket.IO: Validar premio existe
    Socket.IO->>Base de Datos: Buscar cartón
    Socket.IO->>Validador: verifyVictory(type, board)
    Validador-->>Socket.IO: boolean (válido/inválido)
    
    alt Es válido
        Socket.IO->>Base de Datos: Marcar is_winner = true
        Socket.IO->>Base de Datos: Agregar a winners JSON
        Socket.IO->>Sala: emit('winner_announced')
        Socket.IO->>Cliente: emit('claim_result', {ok: true})
        
        alt No quedan premios
            Socket.IO->>Base de Datos: is_started = false
            Socket.IO->>Sala: emit('bingo_finished')
        end
    else No válido
        Socket.IO->>Cliente: emit('claim_result', {ok: false})
    end
```

---

## Sistema de Caché

### ¿Por Qué Caché en Memoria?

1. **Latencia**: Leer de base de datos en cada evento sería muy lento
2. **Frecuencia**: Los números se sortean cada 5 segundos
3. **Consistencia**: La caché se actualiza sincrónicamente con DB

### Operaciones de Caché

```typescript
// Cargar desde DB a caché
async function loadBingo(bingoId: number) {
  const b = await prisma.bingo.findUnique({/*...*/});
  const state: BingoState = { /* mapeo */ };
  activeBingos.set(bingoId, state); // ✅ Guardar en caché
}

// Actualizar caché y DB
async function pushNumber(bingoId: number, n: number) {
  const state = activeBingos.get(bingoId); // ✅ Leer de caché
  state.numbersPlayed.sequence.push(n);    // ✅ Modificar caché
  
  await prisma.bingo.update({              // ✅ Persistir
    where: { id: bingoId },
    data: { numbers_played: state.numbersPlayed }
  });
  
  io.to(roomName(bingoId)).emit(/*...*/); // ✅ Broadcast
}
```

---

## Gestión de Salas

### Concepto de Salas en Socket.IO

Cada bingo tiene una **sala identificada por su ID**:

```typescript
function roomName(bingoId: number) {
  return `bingo:${bingoId}`;
}
```

Ejemplo: `bingo:123`

### Operaciones de Sala

```typescript
// Cliente se une a sala
socket.join(roomName(bingoId));

// Broadcast a toda la sala
io.to(roomName(bingoId)).emit('number_drawn', data);

// Broadcast a TODOS los sockets
io.emit('global_announcement', data);
```

### Ventajas

- **Aislamiento**: Cada bingo tiene sus propios eventos
- **Eficiencia**: No se envían eventos a sockets que no están interesados
- **Escalabilidad**: Socket.IO optimiza internamente

---

## Ciclo de Vida de un Bingo

```
┌─────────────┐
│   CREADO    │ (is_started: false, is_finished: false)
│             │ Creado automáticamente o manualmente
└──────┬──────┘
       │ 
       ├─ POST /bingo/:id/start (manual)
       ├─ Auto-start (si alcanza mínimo de participantes)
       └─ EXPIRACIÓN (si no alcanza mínimo después de ventana de inicio)
       │
       ▼
┌─────────────┐
│  INICIADO   │ (is_started: true)
│             │ Timer corriendo (cada 5 segundos)
└──────┬──────┘
       │ Jugadores reclaman premios
       ▼
┌─────────────┐
│ EN PROGRESO │ Algunos winners registrados
│             │
└──────┬──────┘
       │ (a) Todos los premios reclamados
       │ (b) POST /bingo/:id/stop (manual)
       │ (c) Se acaban los 75 números
       ▼
┌─────────────┐
│ FINALIZADO  │ (is_finished: true)
│             │ Timer detenido
│             │ Cartones no jugados transferidos al siguiente bingo
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ NUEVO BINGO │ Creado automáticamente con últimos parámetros
│   CREADO    │ Cartones transferidos asignados
└─────────────┘
```

### Estados de Cartón

```
┌──────────────┐
│   ACTIVO     │ (is_winner: false)
│              │
└──────┬───────┘
       │ Reclama premio VÁLIDO
       ▼
┌──────────────┐
│   GANADOR    │ (is_winner: true)
│              │ ⚠️ No puede reclamar más
└──────────────┘
```

---

## Normalización de Datos JSON

### Problema: Estructuras Inconsistentes en Campos JSON

Los campos JSON en PostgreSQL (`winners`, `bingo_prizes`, `numbers_played`) pueden venir como `null` o con estructuras incorrectas desde la BD, lo que puede causar errores en tiempo de ejecución.

### Solución: Función de Normalización

```typescript
// Función helper para normalizar winners
export function normalizeWinners(winners: any): { data: WinnerDTO[] } {
  if (!winners || typeof winners !== 'object') {
    return { data: [] };
  }
  if (!winners.data || !Array.isArray(winners.data)) {
    return { data: [] };
  }
  return { data: winners.data };
}
```

### Uso en el Sistema

- **Al cargar desde BD**: `state.ts` normaliza `winners` antes de convertirlo a array
- **Al actualizar ganadores**: `socket-handlers.ts` normaliza antes de hacer `push`
- **Al contar premios**: `verification.ts` normaliza antes de acceder a `data.length`

### Garantías

- ✅ El campo `winners` siempre tiene la estructura `{ data: WinnerDTO[] }`
- ✅ Nunca será `null`, `undefined` o estructura incorrecta
- ✅ Previene errores por acceso a propiedades inexistentes
- ✅ Código más robusto y mantenible

## Consideraciones de Concurrencia

### Problema: Múltiples Reclamos Simultáneos

Si 2 jugadores reclaman el mismo premio al mismo tiempo:

```typescript
// ⚠️ RIESGO: Race condition
const board = await prisma.bingo_cardboards.findUnique({...});
if (board.is_winner) return; // Puede fallar si ambos leen antes de escribir
```

### Solución: Transacción Atómica

```typescript
await prisma.$transaction([
  prisma.bingo.update({...}),
  prisma.bingo_cardboards.update({
    where: { id: boardId },
    data: { is_winner: true } // ✅ Atómico
  })
]);
```

### Validación Adicional

El servidor valida:
1. ✅ El cartón existe
2. ✅ El cartón NO es ganador (`is_winner: false`)
3. ✅ El patrón es válido
4. ✅ El premio existe y coincide con el tipo de victoria

---

## Sistema de Cron Jobs

El sistema utiliza **node-cron** para tareas programadas:

### Cron Jobs Configurados

1. **Refrescar Parámetros** (cada 2 minutos)
   - Actualiza caché de parámetros desde BD
   - Si cambian, actualiza bingos pendientes

2. **Verificar Inicio de Bingos** (cada 1 minuto)
   - Busca el **último bingo pendiente** (ordenado por `id DESC`)
   - Usa la hora (`start_time`) de ese bingo para verificar si es momento de iniciar
   - Si el bingo no tiene `start_time`, usa parámetros o ENV como fallback
   - Inicia automáticamente si hay mínimo de participantes
   - **Solo un bingo puede iniciarse por día** (el último creado)

3. **Gestión de Bingos** (cada 3 minutos)
   - Crea nuevo bingo cuando uno finaliza
   - Actualiza bingos pendientes con últimos parámetros

4. **Procesar Bingos Expirados** (cada 2 minutos)
   - Detecta bingos que no alcanzaron mínimo de participantes
   - Marca como finalizados
   - Transfiere cartones no jugados al nuevo bingo

### Transferencia de Cartones

Cuando un bingo expira sin iniciarse:
- Se identifican cartones no jugados (`is_winner = false` y sin números marcados)
- Se transfieren automáticamente al nuevo bingo creado
- Los cartones mantienen su `user_id`, `code_id` y `bingo_data_json` original

## Escalabilidad Futura

### Limitaciones Actuales

- **Caché local**: No compartida entre instancias
- **Timer local**: No distribuido
- **Cron jobs locales**: No distribuidos

### Mejoras Recomendadas

1. **Redis**: Caché compartida
2. **Bull/BullMQ**: Cola de trabajos para sorteo y cron jobs distribuidos
3. **Adaptador Redis para Socket.IO**: Broadcast multi-instancia
4. **Load Balancer**: Nginx con sticky sessions
5. **Scheduler distribuido**: Usar Redis o base de datos para coordinar cron jobs

---

## 🔗 Documentos Relacionados

- [Eventos de Socket.IO](./SOCKET_EVENTS.md)
- [Esquema de Base de Datos](./DATABASE.md)
- [Endpoints REST](./API_ENDPOINTS.md)
