# Variables de entorno para Auto-Start de Bingos

Agrega estas variables a tu archivo `.env`:

```env
# Auto-start del bingo
AUTO_START_ENABLED=true
BINGO_START_TIME=09:00
BINGO_TIMEZONE=America/Caracas
```

## Descripción de Variables

- **AUTO_START_ENABLED**: Habilita/deshabilita el inicio automático del bingo
  - `true`: El scheduler verificará y iniciará bingos automáticamente
  - `false`: Solo inicio manual mediante endpoint

- **BINGO_START_TIME**: Hora de inicio en formato HH:mm (24 horas)
  - Ejemplo: `09:00` para las 9:00 AM
  - Ejemplo: `14:30` para las 2:30 PM

- **BINGO_TIMEZONE**: Zona horaria
  - América/Caracas para Venezuela
  - Otras: America/New_York, America/Mexico_City, etc.

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
