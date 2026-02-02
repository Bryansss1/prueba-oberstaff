# 🎲 Bingo Sockets - Documentación General

## 📋 Tabla de Contenido

1. [Visión General del Proyecto](#visión-general-del-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Flujo de Datos](#flujo-de-datos)
6. [Enlaces a Documentación Detallada](#enlaces-a-documentación-detallada)

---

## Visión General del Proyecto

Este proyecto es un **servidor backend para un sistema de Bingo en tiempo real** que utiliza **Socket.IO** para comunicación bidireccional entre clientes y servidor, permitiendo:

- **Gestión de salas de Bingo** con múltiples participantes
- **Sorteo automático de números** en tiempo real
- **Validación de patrones de victoria** (cartón lleno, líneas, esquinas, etc.)
- **Sistema de premios** configurable por tipo de victoria
- **Persistencia de datos** usando PostgreSQL con Prisma ORM
- **Emisión de eventos** a todos los participantes de una sala
- **Inicio automático de bingos** basado en hora del último bingo pendiente (desde BD o ENV como fallback)
- **Gestión automática de ciclo de vida** de bingos (creación, actualización, expiración)
- **Transferencia automática de cartones** no jugados entre bingos
- **Parámetros dinámicos** desde base de datos con caché en memoria
- **Normalización de datos** para garantizar estructura consistente de campos JSON (winners, prizes, etc.)

---

## Arquitectura del Sistema

El sistema sigue una arquitectura de **servidor en tiempo real** con las siguientes capas:

```
┌─────────────────┐
│   Clientes      │ (Navegadores, Apps)
│   WebSocket     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Socket.IO     │ (Servidor de eventos)
│   Server        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lógica de      │ (Validación, sorteo, premios)
│  Negocio        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Prisma ORM     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL     │ (Base de datos)
└─────────────────┘
```

### Componentes Principales:

1. **Express Server**: Maneja endpoints REST para control del bingo
2. **Socket.IO Server**: Gestiona eventos en tiempo real y salas
3. **Prisma Client**: ORM para interacción con la base de datos
4. **Cache en Memoria**: `Map` para estado activo de bingos (baja latencia)
5. **Sistema de Validación**: Algoritmos para verificar patrones de victoria

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Node.js** | - | Runtime de JavaScript |
| **Express** | ^4.21.2 | Framework web para endpoints REST |
| **Socket.IO** | ^4.8.1 | Comunicación WebSocket bidireccional |
| **Prisma** | ^6.19.0 | ORM para PostgreSQL |
| **TypeScript** | ^5.6.3 | Tipado estático |
| **PostgreSQL** | - | Base de datos relacional |
| **Zod** | ^3.24.1 | Validación de esquemas |
| **JWT** | ^9.0.2 | Autenticación (preparado para uso futuro) |
| **bcrypt** | ^5.1.1 | Encriptación de contraseñas |

---

## Estructura del Proyecto

```
bingo-sockets/
├── src/
│   ├── index.ts                    # Punto de entrada principal
│   ├── app.ts                      # Configuración de Express (vacío)
│   ├── database/                   # Configuración de base de datos
│   │   └── prisma/
│   │       ├── schema.prisma       # Esquema de base de datos
│   │       └── generated/          # Cliente Prisma generado
│   ├── middlewares/                # Middlewares de Express
│   ├── modules/                    # Módulos de aplicación
│   ├── utils/                      # Utilidades
│   │   ├── config/                 # Configuración de entorno
│   │   ├── errors/                 # Manejo de errores
│   │   └── response/               # Formatos de respuesta
│   └── docs/                       # 📚 ESTA DOCUMENTACIÓN
│       ├── README.md               # Este archivo
│       ├── ARCHITECTURE.md         # Arquitectura detallada
│       ├── SOCKET_EVENTS.md        # Eventos de Socket.IO
│       ├── DATABASE.md             # Esquema de base de datos
│       ├── API_ENDPOINTS.md        # Endpoints REST
│       └── VICTORY_PATTERNS.md     # Patrones de victoria
├── dist/                           # Código compilado
├── package.json
└── tsconfig.json
```

---

## Flujo de Datos

### 1. **Inicio de Bingo**
```
Cliente → POST /bingo/:id/start → 
  Servidor carga estado desde DB → 
  Inicia sorteo automático cada 5s → 
  Emite 'number_drawn' a sala
```

### 2. **Jugador se Une**
```
Cliente → Socket 'join_bingo' → 
  Servidor carga estado → 
  Cliente se une a sala → 
  Recibe 'bootstrap' con estado inicial
```

### 3. **Sorteo de Número**
```
Timer del servidor (cada 5s) → 
  Genera número aleatorio → 
  Persiste en DB → 
  Emite 'number_drawn' a toda la sala
```

### 4. **Reclamo de Premio**
```
Cliente → Socket 'claim_bingo' → 
  Servidor valida patrón → 
  Actualiza DB (winners, is_winner) → 
  Emite 'winner_announced' a sala → 
  Verifica si quedan premios → 
  (Opcional) Emite 'bingo_finished'
```

---

## Enlaces a Documentación Detallada

- **[Arquitectura del Sistema](./ARCHITECTURE.md)** - Detalles de diseño y flujo de datos
- **[Eventos de Socket.IO](./SOCKET_EVENTS.md)** - Todos los eventos WebSocket documentados
- **[Esquema de Base de Datos](./DATABASE.md)** - Modelos, relaciones y JSON schemas
- **[Endpoints REST API](./API_ENDPOINTS.md)** - Documentación de endpoints HTTP
- **[Patrones de Victoria](./VICTORY_PATTERNS.md)** - Algoritmos de validación de bingo

---

## 🚀 Inicio Rápido

### Instalación
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (crear .env)
DATABASE_URL="postgresql://..."
PORT=4000

# Ejecutar migraciones de Prisma
npx prisma generate
npx prisma migrate dev
```

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

---

## 📝 Autor

**Bryan Sanabria** (@Bryansss1)

---

## 📄 Licencia

ISC
