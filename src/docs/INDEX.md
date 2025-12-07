# 📚 Índice de Documentación

Esta carpeta contiene la documentación completa del proyecto **Bingo Sockets**.

---

## 📖 Guía de Lectura

### Para Nuevos Desarrolladores

1. **Empieza aquí**: [README.md](./README.md)
   - Visión general del proyecto
   - Tecnologías utilizadas
   - Estructura de archivos

2. **Entiende la arquitectura**: [ARCHITECTURE.md](./ARCHITECTURE.md)
   - Flujo de datos con diagramas de secuencia
   - Sistema de caché
   - Gestión de salas
   - Ciclo de vida de un bingo

3. **Aprende los eventos**: [SOCKET_EVENTS.md](./SOCKET_EVENTS.md)
   - Eventos cliente ↔ servidor
   - Ejemplos completos de implementación
   - Payloads y respuestas

### Para Desarrolladores Backend

4. **Base de datos**: [DATABASE.md](./DATABASE.md)
   - Diagrama ER
   - Modelos de Prisma
   - Estructura de campos JSON
   - Consultas comunes

5. **API REST**: [API_ENDPOINTS.md](./API_ENDPOINTS.md)
   - Endpoints disponibles
   - Ejemplos en múltiples lenguajes
   - Seguridad y autenticación

### Para Lógica de Negocio

6. **Patrones de victoria**: [VICTORY_PATTERNS.md](./VICTORY_PATTERNS.md)
   - 8 patrones validados
   - Algoritmos de verificación
   - Visualizaciones ASCII
   - Optimizaciones

---

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env
DATABASE_URL="postgresql://..."
PORT=4000

# 3. Generar Prisma Client
npx prisma generate

# 4. Ejecutar en desarrollo
npm run dev

# 5. El servidor estará en http://localhost:4000
```

---

## 📂 Archivos en esta Carpeta

| Archivo | Descripción |
|---------|-------------|
| [README.md](./README.md) | Introducción y visión general |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitectura y flujos del sistema |
| [SOCKET_EVENTS.md](./SOCKET_EVENTS.md) | Documentación de eventos WebSocket |
| [DATABASE.md](./DATABASE.md) | Esquema de base de datos |
| [API_ENDPOINTS.md](./API_ENDPOINTS.md) | Endpoints REST |
| [VICTORY_PATTERNS.md](./VICTORY_PATTERNS.md) | Patrones de victoria y validación |
| **INDEX.md** | Este archivo (navegación) |

---

## 🔑 Conceptos Clave

### Flujo Básico de un Bingo

```
1. Admin inicia bingo → POST /bingo/:id/start
2. Jugadores se unen → Socket 'join_bingo'
3. Servidor sortea números → Emit 'number_drawn' (cada 5s)
4. Jugador reclama premio → Socket 'claim_bingo'
5. Servidor valida patrón → Emit 'winner_announced'
6. Bingo termina → Emit 'bingo_finished'
```

### Tecnologías Principales

- **Express.js**: Servidor HTTP
- **Socket.IO**: WebSocket bidireccional
- **Prisma**: ORM para PostgreSQL
- **TypeScript**: Tipado estático

---

## 🎯 Casos de Uso Comunes

### Implementar un Cliente Web

1. Lee [SOCKET_EVENTS.md](./SOCKET_EVENTS.md)
2. Conecta con `socket.io-client`
3. Escucha eventos: `bootstrap`, `number_drawn`, `winner_announced`
4. Emite: `join_bingo`, `claim_bingo`

### Agregar un Nuevo Patrón de Victoria

1. Agrega el enum en [schema.prisma](../database/prisma/schema.prisma)
2. Implementa el algoritmo en [index.ts](../index.ts) → `verifyVictory()`
3. Documenta en [VICTORY_PATTERNS.md](./VICTORY_PATTERNS.md)

### Modificar el Intervalo de Sorteo

Busca en [index.ts](../index.ts):
```typescript
}, 5000); // Cambiar esta línea (milisegundos)
```

---

## 🐛 Debugging

### Ver logs de Socket.IO

```typescript
// En el cliente
localStorage.debug = 'socket.io-client:socket';
```

### Inspeccionar estado de caché

```typescript
console.log(activeBingos.get(bingoId));
```

### Verificar números sorteados

```bash
# Endpoint REST
curl http://localhost:4000/bingo/123
```

---

## 🔒 Seguridad

⚠️ **Importante**: Los endpoints REST están **sin protección** actualmente.

**Para producción**, implementa:
1. Autenticación JWT
2. Validación de roles
3. Rate limiting
4. CORS restringido

Ver detalles en [API_ENDPOINTS.md](./API_ENDPOINTS.md#seguridad-y-autenticación).

---

## 📞 Contacto

**Autor**: Bryan Sanabria (@Bryansss1)  
**Licencia**: ISC

---

## 📝 Notas de Versiones Futuras

### Mejoras Recomendadas

- [ ] Implementar autenticación JWT
- [ ] Agregar tests unitarios
- [ ] Migrar caché a Redis
- [ ] Implementar cola de trabajos (Bull)
- [ ] Documentación con Swagger/OpenAPI
- [ ] Monitoreo con Sentry/Datadog
- [ ] Soporte multi-instancia con adaptador Redis

---

## 🎨 Diagramas

Esta documentación incluye:

- **Diagramas de secuencia** (Mermaid) en [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Diagrama ER** en [DATABASE.md](./DATABASE.md)
- **Visualizaciones ASCII** de patrones en [VICTORY_PATTERNS.md](./VICTORY_PATTERNS.md)

---

**Última actualización**: Diciembre 2025
