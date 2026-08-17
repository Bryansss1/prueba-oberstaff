# 🌐 Endpoints REST API

## Índice
1. [Endpoints de Bingo](#endpoints-de-bingo)
2. [Ejemplos de Uso](#ejemplos-de-uso)
3. [Códigos de Respuesta](#códigos-de-respuesta)

---

## Endpoints de Bingo

### 1. `GET /bingo/:id`

**Descripción**: Obtiene el estado actual de un bingo.

**Parámetros de Ruta:**
- `id` (number): ID del bingo

**Respuesta:**
```json
{
  "bingoId": 123,
  "is_started": true,
  "prizes": [
    {
      "prize_id": 1,
      "name": "Premio Mayor",
      "description": "Cartón completo",
      "type_of_victory": "CARTON_LLENO"
    }
  ],
  "numbersPlayed": {
    "sequence": [12, 45, 67, 23, 89],
    "last5": [45, 67, 23, 89, 34]
  }
}
```

**Ejemplo cURL:**
```bash
curl http://localhost:4000/bingo/123
```

**Flujo Interno:**
1. Carga el bingo desde DB a caché
2. Retorna el estado actual

---

### 2. `POST /bingo/:id/start`

**Descripción**: Inicia un bingo (comienza el sorteo automático).

**Parámetros de Ruta:**
- `id` (number): ID del bingo

**Request Body**: Ninguno

**Autenticación**: JWT Bearer requerido. Roles permitidos: **ADMIN** u **OPERADOR** vigentes.

**Respuesta:**
```json
{
  "ok": true
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/bingo/123/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Flujo Interno:**
1. Carga el bingo desde DB
2. Marca `is_started = true` en DB
3. Inicia el timer de sorteo (cada 5 segundos)
4. Los números se emitirán vía Socket.IO

**⚠️ Importante:**
- El sorteo no parará hasta que se llame a `/bingo/:id/stop` o se agoten los premios/números

---

### 3. `POST /bingo/:id/stop`

**Descripción**: Detiene un bingo manualmente.

**Parámetros de Ruta:**
- `id` (number): ID del bingo

**Request Body**: Ninguno

**Autenticación**: JWT Bearer requerido. Roles permitidos: **ADMIN** u **OPERADOR** vigentes.

**Respuesta:**
```json
{
  "ok": true
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:4000/bingo/123/stop \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Flujo Interno:**
1. Marca `is_started = false` en DB
2. Actualiza el caché
3. El timer se detendrá en la próxima iteración

**Efecto en Clientes:**
- El timer deja de sortear números
- Los reclamos posteriores se rechazan porque el bingo ya no está activo

---

## Ejemplos de Uso

### JavaScript (Fetch API)

```javascript
// Obtener estado de bingo
async function getBingoState(bingoId) {
  const response = await fetch(`http://localhost:4000/bingo/${bingoId}`);
  const data = await response.json();
  console.log('Estado del bingo:', data);
  return data;
}

// Iniciar bingo
async function startBingo(bingoId, token) {
  const response = await fetch(`http://localhost:4000/bingo/${bingoId}/start`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await response.json();
  console.log('Bingo iniciado:', data);
  return data;
}

// Detener bingo
async function stopBingo(bingoId, token) {
  const response = await fetch(`http://localhost:4000/bingo/${bingoId}/stop`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await response.json();
  console.log('Bingo detenido:', data);
  return data;
}
```

### Python (requests)

```python
import requests

BASE_URL = 'http://localhost:4000'

# Obtener estado
def get_bingo_state(bingo_id):
    response = requests.get(f'{BASE_URL}/bingo/{bingo_id}')
    return response.json()

# Iniciar bingo
def start_bingo(bingo_id, token):
    response = requests.post(
        f'{BASE_URL}/bingo/{bingo_id}/start',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# Detener bingo
def stop_bingo(bingo_id, token):
    response = requests.post(
        f'{BASE_URL}/bingo/{bingo_id}/stop',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

### React Component

```jsx
import { useState, useEffect } from 'react';

function BingoAdmin({ bingoId, token }) {
  const [bingoState, setBingoState] = useState(null);

  useEffect(() => {
    loadBingoState();
  }, [bingoId]);

  const loadBingoState = async () => {
    const response = await fetch(`http://localhost:4000/bingo/${bingoId}`);
    const data = await response.json();
    setBingoState(data);
  };

  const handleStart = async () => {
    await fetch(`http://localhost:4000/bingo/${bingoId}/start`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadBingoState();
  };

  const handleStop = async () => {
    await fetch(`http://localhost:4000/bingo/${bingoId}/stop`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadBingoState();
  };

  if (!bingoState) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Bingo #{bingoState.bingoId}</h2>
      <p>Estado: {bingoState.is_started ? 'En curso' : 'Detenido'}</p>
      <p>Números sorteados: {bingoState.numbersPlayed.sequence.length}</p>
      
      <div>
        <button onClick={handleStart} disabled={bingoState.is_started}>
          Iniciar
        </button>
        <button onClick={handleStop} disabled={!bingoState.is_started}>
          Detener
        </button>
      </div>

      <div>
        <h3>Últimos 5 números:</h3>
        {bingoState.numbersPlayed.last5.map((num, i) => (
          <span key={i} className="ball">{num}</span>
        ))}
      </div>

      <div>
        <h3>Premios disponibles:</h3>
        <ul>
          {bingoState.prizes.map(prize => (
            <li key={prize.prize_id}>
              {prize.name} - {prize.type_of_victory}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

---

## Códigos de Respuesta

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa |
| **401** | Unauthorized | JWT ausente, inválido o expirado en start/stop |
| **403** | Forbidden | El usuario no es ADMIN ni OPERADOR vigente |
| **409** | Conflict | Intento de iniciar un bingo no disponible |
| **500** | Error Interno | Error en el servidor (ej: DB desconectada) |

**Nota**: El código actual no implementa validaciones extensas (ej: 404 si el bingo no existe). Las mejoras futuras deberían incluir:
- `404 Not Found`: Bingo no existe
- `400 Bad Request`: ID inválido
- `409 Conflict`: Intentar iniciar un bingo ya iniciado

---

## Seguridad y Autenticación

### Estado Actual

✅ Los endpoints `/bingo/:id/start` y `/bingo/:id/stop` requieren `Authorization: Bearer <JWT>`.
El servidor consulta la base de datos y permite sólo roles **ADMIN** u **OPERADOR** no eliminados.

### Mejoras Recomendadas

#### 1. Autenticación JWT

```javascript
// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Proteger endpoints
app.post('/bingo/:id/start', authMiddleware, isAdmin, async (req, res) => {
  // ...
});
```

#### 2. Control de Roles

```javascript
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
```

---

## Rate Limiting

Para evitar abuso, considera implementar rate limiting:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por IP
  message: 'Demasiadas peticiones, intenta de nuevo más tarde'
});

app.use('/bingo/', limiter);
```

---

## CORS

El servidor permite **todos los orígenes** (`origin: "*"`):

```typescript
const io = new Server(server, { cors: { origin: "*" } });
```

### Producción Recomendada

```typescript
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'https://mibingo.com',
    credentials: true
  }
});
```

---

## 🔗 Documentos Relacionados

- [Arquitectura del Sistema](./ARCHITECTURE.md)
- [Eventos de Socket.IO](./SOCKET_EVENTS.md)
- [Esquema de Base de Datos](./DATABASE.md)
