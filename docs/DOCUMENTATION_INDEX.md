# 📚 Documentación Completa - Bingo Sockets API

Bienvenido a la documentación del sistema de Bingo con Socket.IO. Este sistema permite gestionar bingos en tiempo real con autenticación JWT.

---

## 📁 Archivos de Documentación

### 1. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
Documentación completa de la API REST y eventos Socket.IO:
- ✅ Endpoints REST con ejemplos
- ✅ Eventos Socket.IO (cliente y servidor)
- ✅ Tipos de datos y estructuras
- ✅ Códigos de error
- ✅ Flujo de uso completo

### 2. **[Bingo_API.postman_collection.json](./Bingo_API.postman_collection.json)**
Colección de Postman para probar la API:
- ✅ Todos los endpoints configurados
- ✅ Variables de entorno (base_url, jwt_token, bingo_id)
- ✅ Autenticación JWT preconfigurada
- ✅ Ejemplos de respuestas

**Cómo importar en Postman:**
1. Abre Postman
2. Click en "Import"
3. Selecciona el archivo `Bingo_API.postman_collection.json`
4. Configura la variable `jwt_token` con tu token JWT

### 3. **[SOCKET_EXAMPLES.md](./SOCKET_EXAMPLES.md)**
Ejemplos de código para clientes Socket.IO:
- ✅ React/Next.js completo
- ✅ JavaScript Vanilla (HTML)
- ✅ Node.js (server-to-server)
- ✅ Testing con Jest
- ✅ Manejo de errores y reconexión

---

## 🚀 Quick Start

### 1. Iniciar el Servidor
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:3002`

### 2. Probar API REST

**Obtener estado de un bingo (público):**
```bash
curl http://localhost:3002/bingo/1
```

**Iniciar bingo (requiere JWT):**
```bash
curl -X POST http://localhost:3002/bingo/1/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Conectar Socket.IO

**JavaScript:**
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3002', {
  auth: { token: 'YOUR_JWT_TOKEN' }
});

socket.on('connect', () => {
  socket.emit('join_bingo', { bingoId: 1 });
});

socket.on('number_drawn', (data) => {
  console.log('Número:', data.number);
});
```

---

## 🔐 Autenticación

**REST API:** Usa el header `Authorization: Bearer TOKEN`

**Socket.IO:** Envía el token en el handshake:
```javascript
{ auth: { token: 'YOUR_JWT_TOKEN' } }
```

---

## 📊 Endpoints Disponibles

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|-----|-------------|
| GET | `/bingo/:id` | ❌ No | - | Obtener estado del bingo |
| POST | `/bingo/:id/start` | ✅ Sí | 🔒 ADMIN | Iniciar bingo |
| POST | `/bingo/:id/stop` | ✅ Sí | 🔒 ADMIN | Detener bingo |

---

## 🔌 Eventos Socket.IO

### Cliente → Servidor
- `join_bingo` - Unirse a una sala
- `claim_bingo` - Reclamar victoria

### Servidor → Cliente
- `bootstrap` - Estado inicial
- `number_drawn` - Nuevo número
- `claim_result` - Resultado de reclamación
- `winner_announced` - Nuevo ganador
- `bingo_finished` - Bingo terminado

---

## 🎯 Tipos de Victoria

- `CARTON_LLENO` - Cartón completo
- `LINEA_SIMPLE` - Una línea
- `LINEA_DOBLE` - Dos líneas
- `CUATRO_ESQUINAS` - 4 esquinas
- `PERIMETRO` - Todo el perímetro
- `LETRA_H` - Forma de H
- `NUMERO_7` - Forma de 7
- `FLECHA` - Forma de flecha

---

## 🛠️ Desarrollo

### Estructura del Proyecto
```
src/
├── bingo/
│   ├── types.ts              # Tipos TypeScript
│   ├── state.ts              # Estado en memoria
│   ├── verification.ts       # Validación de victorias
│   ├── number-feeder.ts      # Generación de números
│   ├── routes.ts             # REST API
│   └── socket-handlers.ts    # Socket.IO handlers
├── config/
│   ├── prisma.ts             # Cliente Prisma
│   └── socket-io.ts          # Config Socket.IO
└── index.ts                  # Punto de entrada
```

### Scripts Disponibles
```bash
npm run dev      # Desarrollo con nodemon
npm run build    # Compilar TypeScript
npm start        # Producción
```

---

## 🧪 Testing

Ver [SOCKET_EXAMPLES.md](./SOCKET_EXAMPLES.md) para ejemplos de testing con Jest.

---

## 📞 Soporte

Para más información, revisa:
- **API completa:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Ejemplos de código:** [SOCKET_EXAMPLES.md](./SOCKET_EXAMPLES.md)
- **Colección Postman:** [Bingo_API.postman_collection.json](./Bingo_API.postman_collection.json)

---

## 🔒 Seguridad

- ✅ JWT requerido para endpoints administrativos
- ✅ Control de acceso basado en roles (ADMIN/USER)
- ✅ Solo usuarios ADMIN pueden iniciar/detener bingos
- ✅ Socket.IO protegido con JWT
- ✅ Validación de propiedad de cartones
- ✅ Verificación server-side de patrones de victoria

---

## 📝 Licencia

ISC - Bryan Sanabria @Bryansss1
