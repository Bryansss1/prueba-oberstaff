// Especificación OpenAPI 3.0 para la API de Bingo
import type { OpenAPIV3 } from "openapi-types";

export function getSwaggerSpec(): OpenAPIV3.Document {
  return {
    openapi: "3.0.0",
    info: {
      title: "Bingo API",
      version: "1.0.0",
      description: `API REST y WebSocket para gestión de bingos en tiempo real.

## WebSocket Events
Esta API también utiliza Socket.IO para comunicación en tiempo real.
Ver sección "WebSocket Events" para más detalles sobre los eventos disponibles.

## Autenticación
Los endpoints de prueba (start/stop) no requieren autenticación.
Los eventos de Socket.IO requieren autenticación JWT en la conexión.`,
      contact: {
        name: "Bingo API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor de desarrollo",
      },
    ],
    tags: [
      {
        name: "Bingo",
        description: "Endpoints REST para gestión de bingos",
      },
      {
        name: "WebSocket Events",
        description: "Eventos de Socket.IO para comunicación en tiempo real",
      },
    ],
    paths: {
      "/bingo/{id}": {
        get: {
          tags: ["Bingo"],
          summary: "Obtener estado del bingo",
          description: "Obtiene el estado actual de un bingo específico, incluyendo premios disponibles y números sorteados.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "ID del bingo",
              example: 1,
            },
          ],
          responses: {
            "200": {
              description: "Estado del bingo obtenido exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/BingoStateResponse",
                  },
                  example: {
                    bingoId: 1,
                    is_started: true,
                    prizes: [
                      {
                        prize_id: 1,
                        name: "Premio Mayor",
                        description: "Cartón completo",
                        image: "https://example.com/premio.jpg",
                        type_of_victory: "CARTON_LLENO",
                      },
                    ],
                    numbersPlayed: {
                      sequence: [15, 23, 42, 67, 8],
                      last5: [23, 42, 67, 8, 51],
                    },
                  },
                },
              },
            },
            "500": {
              description: "Error al obtener el bingo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  example: {
                    error: "Error al obtener el bingo",
                  },
                },
              },
            },
          },
        },
      },
      "/bingo/{id}/start": {
        post: {
          tags: ["Bingo"],
          summary: "Iniciar bingo",
          description: "Inicia un bingo y comienza la extracción automática de números cada 5 segundos. **Sin autenticación requerida (para pruebas)**.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "ID del bingo",
              example: 1,
            },
          ],
          responses: {
            "200": {
              description: "Bingo iniciado exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                  example: {
                    ok: true,
                  },
                },
              },
            },
            "500": {
              description: "Error al iniciar el bingo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  example: {
                    error: "Error al iniciar el bingo",
                  },
                },
              },
            },
          },
        },
      },
      "/bingo/{id}/stop": {
        post: {
          tags: ["Bingo"],
          summary: "Detener bingo",
          description: "Detiene un bingo manualmente y notifica a todos los jugadores. Marca el bingo como finalizado. **Sin autenticación requerida (para pruebas)**.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              description: "ID del bingo",
              example: 1,
            },
          ],
          responses: {
            "200": {
              description: "Bingo detenido exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/SuccessResponse",
                  },
                  example: {
                    ok: true,
                  },
                },
              },
            },
            "500": {
              description: "Error al detener el bingo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  example: {
                    error: "Error al detener el bingo",
                  },
                },
              },
            },
          },
        },
      },
      // Documentación de eventos Socket.IO (paths descriptivos)
      "/websocket/events/join_bingo": {
        post: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Unirse a bingo",
          description: `**Evento Socket.IO**: \`join_bingo\`

El cliente emite este evento para unirse a una sala de bingo y recibir actualizaciones en tiempo real.

**Ejemplo de uso:**
\`\`\`javascript
socket.emit('join_bingo', { bingoId: 1 });
\`\`\`

**Respuesta**: El servidor emite el evento \`bootstrap\` con el estado inicial del bingo.`,
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/JoinBingoPayload",
                },
                example: {
                  bingoId: 1,
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Evento emitido exitosamente. El servidor responderá con el evento 'bootstrap'.",
            },
          },
        },
      },
      "/websocket/events/claim_bingo": {
        post: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Reclamar premio",
          description: `**Evento Socket.IO**: \`claim_bingo\`

El cliente emite este evento para reclamar un premio cuando completa un patrón ganador en su cartón.

**Ejemplo de uso:**
\`\`\`javascript
socket.emit('claim_bingo', {
  bingoId: 1,
  boardId: 123,
  prize_id: 5,
  type_of_victory: 'LINEA_SIMPLE'
});
\`\`\`

**Respuesta**: El servidor emite el evento \`claim_result\` con el resultado del reclamo.`,
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ClaimBingoPayload",
                },
                example: {
                  bingoId: 1,
                  boardId: 123,
                  prize_id: 5,
                  type_of_victory: "LINEA_SIMPLE",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Evento emitido exitosamente. El servidor responderá con el evento 'claim_result'.",
            },
          },
        },
      },
      // Eventos del servidor (documentación)
      "/websocket/events/bootstrap": {
        get: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Estado inicial (Servidor → Cliente)",
          description: `**Evento Socket.IO**: \`bootstrap\` (emitido por el servidor)

El servidor emite este evento cuando un cliente se une a un bingo (después de \`join_bingo\`).

**Ejemplo de uso:**
\`\`\`javascript
socket.on('bootstrap', (data) => {
  console.log('Últimos números:', data.last5);
  console.log('Premios disponibles:', data.prizes);
  console.log('Bingo iniciado:', data.is_started);
  console.log('Ganadores:', data.winners);
});
\`\`\``,
          responses: {
            "200": {
              description: "Evento recibido del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/BootstrapEvent",
                  },
                },
              },
            },
          },
        },
      },
      "/websocket/events/number_drawn": {
        get: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Nuevo número sorteado (Servidor → Cliente)",
          description: `**Evento Socket.IO**: \`number_drawn\` (emitido por el servidor)

El servidor emite este evento cada 5 segundos cuando se sortea un nuevo número (mientras el bingo esté activo).

**Ejemplo de uso:**
\`\`\`javascript
socket.on('number_drawn', (data) => {
  console.log('Nuevo número:', data.number);
  console.log('Últimos 5:', data.last5);
  console.log('Total sorteados:', data.sequenceLength);
  
  // Marcar número en el cartón
  markNumberOnBoard(data.number);
});
\`\`\``,
          responses: {
            "200": {
              description: "Evento recibido del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/NumberDrawnEvent",
                  },
                },
              },
            },
          },
        },
      },
      "/websocket/events/winner_announced": {
        get: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Nuevo ganador (Servidor → Cliente)",
          description: `**Evento Socket.IO**: \`winner_announced\` (emitido por el servidor)

El servidor emite este evento a todos los jugadores cuando alguien gana un premio.

**Ejemplo de uso:**
\`\`\`javascript
socket.on('winner_announced', (data) => {
  console.log('¡Nuevo ganador!');
  console.log('Cartón:', data.boardId);
  console.log('Premio:', data.prizeName);
  console.log('Tipo de victoria:', data.type_of_victory);
  console.log('Todos los ganadores:', data.winners);
  
  showWinnerNotification(data);
});
\`\`\``,
          responses: {
            "200": {
              description: "Evento recibido del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/WinnerAnnouncedEvent",
                  },
                },
              },
            },
          },
        },
      },
      "/websocket/events/claim_result": {
        get: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Resultado de reclamo (Servidor → Cliente)",
          description: `**Evento Socket.IO**: \`claim_result\` (emitido por el servidor)

El servidor emite este evento como respuesta directa al cliente que emitió \`claim_bingo\`.

**Ejemplo de uso:**
\`\`\`javascript
socket.on('claim_result', (result) => {
  if (result.ok) {
    console.log('¡Premio reclamado exitosamente!');
    showSuccessMessage();
  } else {
    console.error('Error al reclamar:', result.reason);
    showErrorMessage(result.reason);
  }
});
\`\`\`

**Razones de error posibles:**
- \`"Bingo inactivo"\` - El bingo no está iniciado
- \`"Premio/victoria inválidos"\` - Premio no existe o tipo de victoria incorrecto
- \`"Cartón inválido o ya ganador"\` - Cartón no existe, ya ganó, o pertenece a otro bingo
- \`"No tienes permiso para reclamar este cartón"\` - El cartón no pertenece al usuario
- \`"Patrón no válido"\` - El patrón de victoria no es válido en el cartón
- \`"Error interno"\` - Error del servidor`,
          responses: {
            "200": {
              description: "Evento recibido del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ClaimResultEvent",
                  },
                },
              },
            },
          },
        },
      },
      "/websocket/events/bingo_finished": {
        get: {
          tags: ["WebSocket Events"],
          summary: "Evento Socket.IO - Bingo terminado (Servidor → Cliente)",
          description: `**Evento Socket.IO**: \`bingo_finished\` (emitido por el servidor)

El servidor emite este evento a todos los jugadores cuando el bingo termina.

**Ejemplo de uso:**
\`\`\`javascript
socket.on('bingo_finished', (data) => {
  console.log('Bingo finalizado:', data.reason);
  
  // Mostrar pantalla de fin de juego
  showGameOverScreen(data.reason);
  disableBoardInteraction();
});
\`\`\`

**Razones posibles:**
- \`"Sin premios restantes"\` - Todos los premios fueron ganados
- \`"Sin números restantes"\` - Se agotaron los 75 números
- \`"Bingo detenido manualmente por el administrador"\` - Admin detuvo el bingo`,
          responses: {
            "200": {
              description: "Evento recibido del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/BingoFinishedEvent",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        BingoStateResponse: {
          type: "object",
          properties: {
            bingoId: {
              type: "integer",
              description: "ID del bingo",
              example: 1,
            },
            is_started: {
              type: "boolean",
              description: "Indica si el bingo está iniciado",
              example: true,
            },
            prizes: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Prize",
              },
              description: "Lista de premios disponibles",
            },
            numbersPlayed: {
              $ref: "#/components/schemas/NumbersPlayed",
            },
          },
        },
        Prize: {
          type: "object",
          properties: {
            prize_id: {
              type: "integer",
              description: "ID del premio",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nombre del premio",
              example: "Premio Mayor",
            },
            description: {
              type: "string",
              description: "Descripción del premio",
              example: "Cartón completo",
            },
            image: {
              type: "string",
              format: "uri",
              description: "URL de la imagen del premio",
              example: "https://example.com/premio.jpg",
            },
            type_of_victory: {
              $ref: "#/components/schemas/VictoryType",
            },
          },
        },
        VictoryType: {
          type: "string",
          enum: [
            "CARTON_LLENO",
            "LINEA_SIMPLE",
            "LINEA_DOBLE",
            "CUATRO_ESQUINAS",
            "PERIMETRO",
            "LETRA_H",
            "NUMERO_7",
            "FLECHA",
          ],
          description: "Tipo de patrón de victoria",
          example: "LINEA_SIMPLE",
        },
        NumbersPlayed: {
          type: "object",
          properties: {
            sequence: {
              type: "array",
              items: {
                type: "integer",
                minimum: 1,
                maximum: 75,
              },
              description: "Secuencia completa de números sorteados",
              example: [15, 23, 42, 67, 8],
            },
            last5: {
              type: "array",
              items: {
                type: "integer",
                minimum: 1,
                maximum: 75,
              },
              description: "Últimos 5 números sorteados",
              example: [23, 42, 67, 8, 51],
            },
          },
        },
        WinnerDTO: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "ID del usuario ganador",
            },
            user_email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            user_names: {
              type: "string",
              description: "Nombres del usuario",
            },
            user_last_names: {
              type: "string",
              description: "Apellidos del usuario",
            },
            user_phone_number: {
              type: "string",
              description: "Teléfono del usuario",
            },
            user_account_owner_dni: {
              type: "string",
              description: "DNI del titular de cuenta",
            },
            user_account_number: {
              type: "string",
              description: "Número de cuenta",
            },
            user_bank_name: {
              type: "string",
              description: "Nombre del banco",
            },
            user_dni: {
              type: "string",
              description: "DNI del usuario",
            },
            prize_id: {
              type: "integer",
              description: "ID del premio ganado",
            },
            prize_name: {
              type: "string",
              description: "Nombre del premio",
            },
            prize_description: {
              type: "string",
              description: "Descripción del premio",
            },
            prize_image: {
              type: "string",
              format: "uri",
              description: "URL de la imagen del premio",
            },
            type_of_victory: {
              $ref: "#/components/schemas/VictoryType",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            ok: {
              type: "boolean",
              example: true,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Error al obtener el bingo",
            },
          },
        },
        JoinBingoPayload: {
          type: "object",
          required: ["bingoId"],
          properties: {
            bingoId: {
              type: "integer",
              description: "ID del bingo al que se desea unir",
              example: 1,
            },
          },
        },
        ClaimBingoPayload: {
          type: "object",
          required: ["bingoId", "boardId", "prize_id", "type_of_victory"],
          properties: {
            bingoId: {
              type: "integer",
              description: "ID del bingo activo",
              example: 1,
            },
            boardId: {
              type: "integer",
              description: "ID del cartón que reclama",
              example: 123,
            },
            prize_id: {
              type: "integer",
              description: "ID del premio reclamado",
              example: 5,
            },
            type_of_victory: {
              $ref: "#/components/schemas/VictoryType",
            },
            boardSnapshot: {
              type: "object",
              description: "Estado actual del cartón (opcional)",
            },
          },
        },
        BootstrapEvent: {
          type: "object",
          description: "Evento emitido por el servidor cuando un cliente se une a un bingo",
          properties: {
            last5: {
              type: "array",
              items: {
                type: "integer",
              },
              description: "Últimos 5 números sorteados",
              example: [23, 42, 67, 8, 51],
            },
            prizes: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Prize",
              },
              description: "Lista de premios disponibles",
            },
            is_started: {
              type: "boolean",
              description: "Indica si el bingo está iniciado",
              example: true,
            },
            winners: {
              type: "array",
              items: {
                $ref: "#/components/schemas/WinnerDTO",
              },
              description: "Lista de ganadores actuales",
            },
          },
        },
        NumberDrawnEvent: {
          type: "object",
          description: "Evento emitido por el servidor cuando se sortea un nuevo número",
          properties: {
            number: {
              type: "integer",
              minimum: 1,
              maximum: 75,
              description: "Número sorteado",
              example: 42,
            },
            last5: {
              type: "array",
              items: {
                type: "integer",
              },
              description: "Últimos 5 números sorteados",
              example: [12, 34, 56, 23, 42],
            },
            sequenceLength: {
              type: "integer",
              description: "Total de números sorteados hasta ahora",
              example: 27,
            },
          },
        },
        WinnerAnnouncedEvent: {
          type: "object",
          description: "Evento emitido por el servidor cuando alguien gana un premio",
          properties: {
            boardId: {
              type: "integer",
              description: "ID del cartón ganador",
              example: 123,
            },
            prizeId: {
              type: "integer",
              description: "ID del premio ganado",
              example: 5,
            },
            prizeName: {
              type: "string",
              description: "Nombre del premio",
              example: "Premio Mayor",
            },
            type_of_victory: {
              $ref: "#/components/schemas/VictoryType",
            },
            time: {
              type: "integer",
              description: "Timestamp del momento de la victoria",
              example: 1699123456789,
            },
            winners: {
              type: "array",
              items: {
                $ref: "#/components/schemas/WinnerDTO",
              },
              description: "Lista actualizada de todos los ganadores",
            },
          },
        },
        ClaimResultEvent: {
          type: "object",
          description: "Evento emitido por el servidor como respuesta a un reclamo de premio",
          oneOf: [
            {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                  example: true,
                },
              },
            },
            {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                  example: false,
                },
                reason: {
                  type: "string",
                  description: "Motivo del rechazo",
                  enum: [
                    "Bingo inactivo",
                    "Premio/victoria inválidos",
                    "Cartón inválido o ya ganador",
                    "No tienes permiso para reclamar este cartón",
                    "Patrón no válido",
                    "Error interno",
                  ],
                  example: "Patrón no válido",
                },
              },
            },
          ],
        },
        BingoFinishedEvent: {
          type: "object",
          description: "Evento emitido por el servidor cuando el bingo termina",
          properties: {
            reason: {
              type: "string",
              description: "Motivo de finalización",
              enum: [
                "Sin premios restantes",
                "Sin números restantes",
                "Bingo detenido manualmente por el administrador",
              ],
              example: "Sin premios restantes",
            },
          },
        },
      },
    },
  };
}
