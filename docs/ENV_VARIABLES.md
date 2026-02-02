# Variables de entorno para Auto-Start de Bingos

Agrega estas variables a tu archivo `.env`:

```env
# Auto-start del bingo
AUTO_START_ENABLED=true
BINGO_START_TIME=09:00
BINGO_TIMEZONE=America/Caracas
SCHEDULER_INTERVAL=1
```

## Descripción de Variables

- **AUTO_START_ENABLED**: Habilita/deshabilita el inicio automático del bingo
  - `true`: El scheduler verificará y iniciará bingos automáticamente
  - `false`: Solo inicio manual mediante endpoint

- **BINGO_START_TIME**: Hora de inicio en formato HH:mm (24 horas) - **FALLBACK**
  - ⚠️ **Nota**: Esta variable se usa como fallback si no hay `start_time` en la tabla `parameters` de la BD
  - Ejemplo: `09:00` para las 9:00 AM
  - Ejemplo: `14:30` para las 2:30 PM
  - **Prioridad**: BD > ENV (si hay `start_time` en BD, se usa ese)

- **BINGO_TIMEZONE**: Zona horaria
  - América/Caracas para Venezuela (recomendado)
  - Otras: America/New_York, America/Mexico_City, etc.

- **SCHEDULER_INTERVAL**: Intervalo del scheduler en minutos (opcional, default: 1)
  - Controla la frecuencia de verificación del scheduler

## Ejemplos por Ambiente

### Desarrollo (deshabilitar auto-start)
```env
AUTO_START_ENABLED=false
```

### Producción Venezuela
```env
AUTO_START_ENABLED=true
BINGO_START_TIME=09:00
BINGO_TIMEZONE=America/Caracas
```

### Testing (inicio rápido)
```env
AUTO_START_ENABLED=true
BINGO_START_TIME=10:30
BINGO_TIMEZONE=America/Caracas
```

## Configuración desde Base de Datos

El sistema ahora permite configurar `start_time` desde la tabla `parameters`:

```sql
-- Actualizar hora de inicio en BD (formato HH:mm en hora Venezuela)
UPDATE parameters 
SET start_time = '14:00'  -- 2:00 PM hora Venezuela
WHERE deleted_at IS NULL
ORDER BY id DESC
LIMIT 1;
```

**Prioridad de configuración para Auto-Start:**
1. ✅ **Hora del último bingo pendiente** (`bingo.start_time`) - Si el último bingo tiene `start_time`, se usa esa hora
2. ✅ **Base de Datos** (`parameters.start_time`) - Si el bingo no tiene hora, se usa la de parámetros
3. ⚠️ **Variables de Entorno** (`BINGO_START_TIME`) - Fallback final si no hay en BD

**Comportamiento del Auto-Start:**
- El sistema busca el **último bingo pendiente** (ordenado por `id DESC`)
- Usa la hora (`start_time`) de ese bingo para verificar si es momento de iniciar
- Solo un bingo puede iniciarse por día (el último creado)
- Si el bingo no tiene `start_time`, usa parámetros o ENV como fallback

**Ventajas:**
- Cada bingo puede tener su propia hora de inicio
- Cambios en tiempo real sin reiniciar servidor
- Historial de cambios en BD
- Flexibilidad para diferentes horarios por bingo
