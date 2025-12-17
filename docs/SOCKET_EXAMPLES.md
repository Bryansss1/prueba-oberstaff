# 🚀 Ejemplos de Uso - Cliente Socket.IO

## 📦 Instalación

```bash
npm install socket.io-client
```

---

## 🎮 Ejemplo Completo - React/Next.js

```javascript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function BingoGame({ token, bingoId, boardId }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastNumbers, setLastNumbers] = useState<number[]>([]);
  const [prizes, setPrizes] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Conectar Socket.IO con autenticación
    const newSocket = io('http://localhost:3002', {
      auth: { token }
    });

    // Evento: Conexión exitosa
    newSocket.on('connect', () => {
      console.log('Conectado:', newSocket.id);
      
      // Unirse al bingo
      newSocket.emit('join_bingo', { bingoId });
    });

    // Evento: Error de conexión
    newSocket.on('connect_error', (error) => {
      console.error('Error de autenticación:', error.message);
    });

    // Evento: Estado inicial
    newSocket.on('bootstrap', (data) => {
      console.log('Estado inicial:', data);
      setLastNumbers(data.last5);
      setPrizes(data.prizes);
      setWinners(data.winners);
      setIsStarted(data.is_started);
    });

    // Evento: Nuevo número cantado
    newSocket.on('number_drawn', (data) => {
      console.log('Número cantado:', data.number);
      setLastNumbers(data.last5);
      
      // Marcar número en el cartón (implementa tu lógica)
      markNumberOnBoard(data.number);
    });

    // Evento: Resultado de reclamación
    newSocket.on('claim_result', (result) => {
      if (result.ok) {
        alert('¡Felicidades! Has ganado');
      } else {
        alert('Error: ' + result.reason);
      }
    });

    // Evento: Nuevo ganador anunciado
    newSocket.on('winner_announced', (data) => {
      console.log('Nuevo ganador:', data);
      setWinners(data.winners);
      
      // Mostrar notificación
      showWinnerNotification(data.prizeName);
    });

    // Evento: Bingo finalizado
    newSocket.on('bingo_finished', (data) => {
      console.log('Bingo finalizado:', data.reason);
      setIsStarted(false);
      showGameOver(data.reason);
    });

    setSocket(newSocket);

    // Cleanup al desmontar
    return () => {
      newSocket.close();
    };
  }, [token, bingoId]);

  // Función para reclamar premio
  const claimPrize = (prizeId: number, victoryType: string) => {
    if (!socket) return;

    socket.emit('claim_bingo', {
      bingoId,
      boardId,
      prize_id: prizeId,
      type_of_victory: victoryType
    });
  };

  return (
    <div>
      <h1>Bingo Game</h1>
      
      {/* Estado del juego */}
      <div>
        <p>Estado: {isStarted ? 'En Juego' : 'Detenido'}</p>
        <p>Últimos números: {lastNumbers.join(', ')}</p>
      </div>

      {/* Premios disponibles */}
      <div>
        <h2>Premios</h2>
        {prizes.map(prize => (
          <div key={prize.prize_id}>
            <h3>{prize.name}</h3>
            <p>{prize.type_of_victory}</p>
            <button onClick={() => claimPrize(prize.prize_id, prize.type_of_victory)}>
              ¡Bingo!
            </button>
          </div>
        ))}
      </div>

      {/* Ganadores */}
      <div>
        <h2>Ganadores</h2>
        {winners.map((winner, idx) => (
          <div key={idx}>
            {winner.user_names} {winner.user_last_names} - {winner.prize_name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📱 Ejemplo - JavaScript Vanilla

```html
<!DOCTYPE html>
<html>
<head>
  <title>Bingo Client</title>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
  <h1>Bingo Game</h1>
  
  <div id="last-numbers"></div>
  <div id="prizes"></div>
  <div id="winners"></div>

  <script>
    const token = 'YOUR_JWT_TOKEN';
    const bingoId = 1;
    const boardId = 123;

    // Conectar Socket.IO
    const socket = io('http://localhost:3002', {
      auth: { token }
    });

    // Conexión exitosa
    socket.on('connect', () => {
      console.log('Conectado:', socket.id);
      socket.emit('join_bingo', { bingoId });
    });

    // Error de conexión
    socket.on('connect_error', (error) => {
      console.error('Error:', error.message);
    });

    // Estado inicial
    socket.on('bootstrap', (data) => {
      console.log('Bootstrap:', data);
      updateLastNumbers(data.last5);
      updatePrizes(data.prizes);
      updateWinners(data.winners);
    });

    // Nuevo número
    socket.on('number_drawn', (data) => {
      console.log('Número:', data.number);
      updateLastNumbers(data.last5);
    });

    // Resultado de reclamación
    socket.on('claim_result', (result) => {
      if (result.ok) {
        alert('¡Has ganado!');
      } else {
        alert('Error: ' + result.reason);
      }
    });

    // Nuevo ganador
    socket.on('winner_announced', (data) => {
      console.log('Ganador:', data);
      updateWinners(data.winners);
    });

    // Bingo finalizado
    socket.on('bingo_finished', (data) => {
      alert('Bingo finalizado: ' + data.reason);
    });

    // Funciones auxiliares
    function updateLastNumbers(numbers) {
      document.getElementById('last-numbers').innerHTML = 
        '<h2>Últimos números: ' + numbers.join(', ') + '</h2>';
    }

    function updatePrizes(prizes) {
      const html = prizes.map(p => 
        `<div>
          <h3>${p.name}</h3>
          <button onclick="claimPrize(${p.prize_id}, '${p.type_of_victory}')">
            ¡Bingo!
          </button>
        </div>`
      ).join('');
      document.getElementById('prizes').innerHTML = html;
    }

    function updateWinners(winners) {
      const html = winners.map(w => 
        `<div>${w.user_names} ${w.user_last_names} - ${w.prize_name}</div>`
      ).join('');
      document.getElementById('winners').innerHTML = '<h2>Ganadores</h2>' + html;
    }

    function claimPrize(prizeId, victoryType) {
      socket.emit('claim_bingo', {
        bingoId,
        boardId,
        prize_id: prizeId,
        type_of_victory: victoryType
      });
    }
  </script>
</body>
</html>
```

---

## 🔧 Ejemplo - Node.js Server to Server

```javascript
const io = require('socket.io-client');

const token = 'YOUR_JWT_TOKEN';
const bingoId = 1;

// Conectar
const socket = io('http://localhost:3002', {
  auth: { token }
});

socket.on('connect', () => {
  console.log('✓ Conectado al bingo');
  
  // Unirse al bingo
  socket.emit('join_bingo', { bingoId });
});

socket.on('bootstrap', (data) => {
  console.log('Estado inicial recibido');
  console.log('Bingo iniciado:', data.is_started);
  console.log('Últimos 5 números:', data.last5);
  console.log('Premios disponibles:', data.prizes.length);
});

socket.on('number_drawn', (data) => {
  console.log(`Número cantado: ${data.number}`);
  console.log(`Total cantados: ${data.sequenceLength}`);
});

socket.on('winner_announced', (data) => {
  console.log('¡NUEVO GANADOR!');
  console.log('Premio:', data.prizeName);
  console.log('Tipo:', data.type_of_victory);
});

socket.on('bingo_finished', (data) => {
  console.log('BINGO FINALIZADO');
  console.log('Razón:', data.reason);
  process.exit(0);
});

socket.on('connect_error', (error) => {
  console.error('Error de conexión:', error.message);
  process.exit(1);
});
```

---

## 🧪 Ejemplo - Testing con Jest

```javascript
const io = require('socket.io-client');

describe('Bingo Socket.IO Tests', () => {
  let socket;
  const token = 'VALID_JWT_TOKEN';

  beforeAll((done) => {
    socket = io('http://localhost:3002', {
      auth: { token }
    });
    socket.on('connect', done);
  });

  afterAll(() => {
    socket.close();
  });

  test('should connect successfully', () => {
    expect(socket.connected).toBe(true);
  });

  test('should join bingo and receive bootstrap', (done) => {
    socket.emit('join_bingo', { bingoId: 1 });
    
    socket.on('bootstrap', (data) => {
      expect(data).toHaveProperty('last5');
      expect(data).toHaveProperty('prizes');
      expect(data).toHaveProperty('is_started');
      expect(data).toHaveProperty('winners');
      done();
    });
  });

  test('should receive number_drawn events', (done) => {
    socket.on('number_drawn', (data) => {
      expect(data).toHaveProperty('number');
      expect(data).toHaveProperty('last5');
      expect(data).toHaveProperty('sequenceLength');
      expect(Array.isArray(data.last5)).toBe(true);
      done();
    });
  });

  test('should reject invalid claim', (done) => {
    socket.emit('claim_bingo', {
      bingoId: 1,
      boardId: 999999, // ID inválido
      prize_id: 1,
      type_of_victory: 'LINEA_SIMPLE'
    });

    socket.on('claim_result', (result) => {
      expect(result.ok).toBe(false);
      expect(result.reason).toBeDefined();
      done();
    });
  });
});
```

---

## 🔐 Manejo de Errores

```javascript
const socket = io('http://localhost:3002', {
  auth: { token },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Error de autenticación
socket.on('connect_error', (error) => {
  console.error('Error de conexión:', error.message);
  
  if (error.message.includes('Authentication')) {
    // Token inválido o expirado
    refreshToken().then(newToken => {
      socket.auth.token = newToken;
      socket.connect();
    });
  }
});

// Desconexión
socket.on('disconnect', (reason) => {
  console.log('Desconectado:', reason);
  
  if (reason === 'io server disconnect') {
    // El servidor cerró la conexión, reconectar manualmente
    socket.connect();
  }
  // Si es 'io client disconnect', fue manual
});

// Reconexión exitosa
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconectado después de', attemptNumber, 'intentos');
  // Volver a unirse al bingo
  socket.emit('join_bingo', { bingoId });
});
```
