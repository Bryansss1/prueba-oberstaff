# 🎯 Patrones de Victoria del Bingo

## Índice
1. [Visión General](#visión-general)
2. [Representación de Cartones](#representación-de-cartones)
3. [Algoritmos de Validación](#algoritmos-de-validación)
4. [Visualización de Patrones](#visualización-de-patrones)

---

## Visión General

El sistema valida **8 patrones de victoria** diferentes. Cada patrón tiene su propia lógica de verificación implementada en la función `verifyVictory()`.

### Tipos Soportados

| Tipo | Descripción |
|------|-------------|
| `CARTON_LLENO` | Todas las casillas marcadas |
| `LINEA_SIMPLE` | 1 línea completa (horizontal o vertical) |
| `LINEA_DOBLE` | 2 líneas completas |
| `CUATRO_ESQUINAS` | Las 4 esquinas del cartón |
| `PERIMETRO` | Todo el perímetro marcado |
| `LETRA_H` | Patrón en forma de H |
| `NUMERO_7` | Patrón en forma de 7 |
| `FLECHA` | Diagonal + línea horizontal central |

---

## Representación de Cartones

### Formato JSON

Los cartones se almacenan en `BingoCardboards.bingo_data_json` con la siguiente estructura:

```typescript
{
  size: 5,
  columns: [
    { numbers: [12, -23, 34, 0, 56] },  // Columna B
    { numbers: [17, 28, -39, 40, 51] }, // Columna I
    { numbers: [-13, 24, 0, 46, 57] },  // Columna N (tiene FREE)
    { numbers: [18, 29, 30, -41, 52] }, // Columna G
    { numbers: [19, -20, 31, 42, 53] }  // Columna O
  ]
}
```

### Convención de Marcado

- **Positivo** (`23`): Número **sin marcar**
- **Negativo** (`-23`): Número **marcado**
- **Cero** (`0`): Casilla **FREE** (siempre válida)

### Matriz de Representación

Internamente, el servidor convierte el JSON a una matriz 5x5:

```
┌─────┬─────┬─────┬─────┬─────┐
│ B   │ I   │ N   │ G   │ O   │
├─────┼─────┼─────┼─────┼─────┤
│ 12  │ 17  │-13  │ 18  │ 19  │  Fila 0
│-23  │ 28  │ 24  │ 29  │-20  │  Fila 1
│ 34  │-39  │[0]  │ 30  │ 31  │  Fila 2 (FREE)
│  0  │ 40  │ 46  │-41  │ 42  │  Fila 3
│ 56  │ 51  │ 57  │ 52  │ 53  │  Fila 4
└─────┴─────┴─────┴─────┴─────┘
Col 0  Col 1  Col 2  Col 3  Col 4
```

### Función de Validación de Marcado

```typescript
const isMarked = (num: number): boolean => {
  if (num === 0) return true; // FREE siempre válido
  return num < 0;              // Negativo = marcado
};
```

---

## Algoritmos de Validación

### 1. **CARTON_LLENO**

**Regla**: Todas las casillas deben estar marcadas.

```typescript
matrix.every((row) => row.every((num) => isMarked(num)))
```

**Visualización:**
```
✅ ✅ ✅ ✅ ✅
✅ ✅ ✅ ✅ ✅
✅ ✅ ✅ ✅ ✅
✅ ✅ ✅ ✅ ✅
✅ ✅ ✅ ✅ ✅
```

---

### 2. **LINEA_SIMPLE**

**Regla**: Al menos 1 fila completa **O** 1 columna completa.

```typescript
matrix.some((row) => row.every((num) => isMarked(num))) ||
matrix[0].some((_, colIdx) => matrix.every((row) => isMarked(row[colIdx])))
```

**Posibilidades:**

**Fila horizontal:**
```
⬜ ⬜ ⬜ ⬜ ⬜
✅ ✅ ✅ ✅ ✅  ← Línea
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
```

**Columna vertical:**
```
⬜ ✅ ⬜ ⬜ ⬜
⬜ ✅ ⬜ ⬜ ⬜
⬜ ✅ ⬜ ⬜ ⬜
⬜ ✅ ⬜ ⬜ ⬜
⬜ ✅ ⬜ ⬜ ⬜
    ↑
  Línea
```

---

### 3. **LINEA_DOBLE**

**Regla**: Al menos 2 filas completas **O** 2 columnas completas.

```typescript
const rowsMarked = matrix.filter((row) => 
  row.every((num) => isMarked(num))
).length;

const colsMarked = matrix[0].filter((_, colIdx) => 
  matrix.every((row) => isMarked(row[colIdx]))
).length;

return rowsMarked >= 2 || colsMarked >= 2;
```

**Ejemplo:**
```
✅ ✅ ✅ ✅ ✅  ← Línea 1
⬜ ⬜ ⬜ ⬜ ⬜
✅ ✅ ✅ ✅ ✅  ← Línea 2
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
```

---

### 4. **CUATRO_ESQUINAS**

**Regla**: Las 4 esquinas deben estar marcadas.

```typescript
isMarked(matrix[0][0]) &&
isMarked(matrix[0][size - 1]) &&
isMarked(matrix[size - 1][0]) &&
isMarked(matrix[size - 1][size - 1])
```

**Visualización:**
```
✅ ⬜ ⬜ ⬜ ✅
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
✅ ⬜ ⬜ ⬜ ✅
```

---

### 5. **PERIMETRO**

**Regla**: Todo el borde del cartón marcado.

```typescript
for (let i = 0; i < size; i++) {
  if (!isMarked(matrix[0][i])) return false;       // Fila superior
  if (!isMarked(matrix[size - 1][i])) return false; // Fila inferior
  if (!isMarked(matrix[i][0])) return false;        // Columna izquierda
  if (!isMarked(matrix[i][size - 1])) return false; // Columna derecha
}
return true;
```

**Visualización:**
```
✅ ✅ ✅ ✅ ✅
✅ ⬜ ⬜ ⬜ ✅
✅ ⬜ ⬜ ⬜ ✅
✅ ⬜ ⬜ ⬜ ✅
✅ ✅ ✅ ✅ ✅
```

---

### 6. **LETRA_H**

**Regla**: Columna izquierda + columna derecha + fila del medio.

```typescript
const midRow = Math.floor(size / 2);
const leftCol = matrix.every((row) => isMarked(row[0]));
const rightCol = matrix.every((row) => isMarked(row[size - 1]));
const middleRow = matrix[midRow].every((num) => isMarked(num));

return leftCol && rightCol && middleRow;
```

**Visualización:**
```
✅ ⬜ ⬜ ⬜ ✅
✅ ⬜ ⬜ ⬜ ✅
✅ ✅ ✅ ✅ ✅  ← Barra horizontal
✅ ⬜ ⬜ ⬜ ✅
✅ ⬜ ⬜ ⬜ ✅
```

---

### 7. **NUMERO_7**

**Regla**: Fila superior + diagonal invertida.

```typescript
const topRow = matrix[0].every((num) => isMarked(num));
const diagonal = matrix.every((row, idx) => isMarked(row[size - 1 - idx]));

return topRow && diagonal;
```

**Visualización:**
```
✅ ✅ ✅ ✅ ✅  ← Fila superior
⬜ ⬜ ⬜ ✅ ⬜
⬜ ⬜ ✅ ⬜ ⬜  ← Diagonal invertida
⬜ ✅ ⬜ ⬜ ⬜
✅ ⬜ ⬜ ⬜ ⬜
```

---

### 8. **FLECHA**

**Regla**: Diagonal principal + fila del medio.

```typescript
const diag = matrix.every((row, idx) => isMarked(row[idx]));
const mid = matrix[Math.floor(size / 2)].every((num) => isMarked(num));

return diag && mid;
```

**Visualización:**
```
✅ ⬜ ⬜ ⬜ ⬜
⬜ ✅ ⬜ ⬜ ⬜
✅ ✅ ✅ ✅ ✅  ← Flecha
⬜ ⬜ ⬜ ✅ ⬜
⬜ ⬜ ⬜ ⬜ ✅
```

---

## Visualización de Patrones

### Tabla Resumen

| Patrón | Representación ASCII |
|--------|---------------------|
| **CARTON_LLENO** | `✅✅✅✅✅` (todas) |
| **LINEA_SIMPLE** | `⬜✅✅✅✅⬜` (1 línea) |
| **LINEA_DOBLE** | `✅✅✅✅✅` + `✅✅✅✅✅` (2 líneas) |
| **CUATRO_ESQUINAS** | `✅⬜⬜⬜✅` (4 esquinas) |
| **PERIMETRO** | Marco completo |
| **LETRA_H** | Forma de H |
| **NUMERO_7** | Forma de 7 |
| **FLECHA** | Diagonal + horizontal |

---

## Función Principal: `verifyVictory()`

### Firma

```typescript
async function verifyVictory(
  type: VictoryType,
  boardPayload: any
): Promise<boolean>
```

### Parámetros

- `type`: Tipo de patrón a validar
- `boardPayload`: JSON del cartón (estructura descrita arriba)

### Retorno

- `true`: El patrón es válido
- `false`: El patrón NO es válido

### Flujo Interno

```typescript
async function verifyVictory(type: VictoryType, boardPayload: any): Promise<boolean> {
  // 1. Convertir JSON a matriz 5x5
  const matrix = toMatrix(boardPayload);
  const size = boardPayload.size;

  // 2. Aplicar algoritmo según tipo
  switch (type) {
    case 'CARTON_LLENO':
      return matrix.every((row) => row.every((num) => isMarked(num)));
    
    case 'LINEA_SIMPLE':
      return (
        matrix.some((row) => row.every((num) => isMarked(num))) ||
        matrix[0].some((_, colIdx) => matrix.every((row) => isMarked(row[colIdx])))
      );
    
    // ... otros casos
    
    default:
      return false; // Tipo desconocido
  }
}
```

---

## Optimizaciones y Mejoras

### 1. **Caché de Validaciones**

Para evitar validaciones repetidas:

```typescript
const validationCache = new Map<string, boolean>();

function getCacheKey(boardId: number, type: VictoryType): string {
  return `${boardId}:${type}`;
}

async function verifyVictoryCached(boardId: number, type: VictoryType, board: any) {
  const key = getCacheKey(boardId, type);
  
  if (validationCache.has(key)) {
    return validationCache.get(key)!;
  }
  
  const result = await verifyVictory(type, board);
  validationCache.set(key, result);
  
  return result;
}
```

### 2. **Validación Cliente + Servidor**

Para mejor UX, valida en el cliente **antes** de enviar el reclamo:

```javascript
// Cliente
function canClaimVictory(board, type) {
  const isValid = verifyVictoryClientSide(board, type);
  
  if (!isValid) {
    alert('Tu cartón no cumple con el patrón');
    return false;
  }
  
  // Solo si es válido, enviar al servidor
  socket.emit('claim_bingo', {...});
}
```

⚠️ **Importante**: La validación del servidor es la **fuente de verdad**. La del cliente es solo para UX.

---

## Testing

### Casos de Prueba Recomendados

```typescript
describe('verifyVictory', () => {
  it('valida CARTON_LLENO correctamente', async () => {
    const board = { /* todos números negativos */ };
    expect(await verifyVictory('CARTON_LLENO', board)).toBe(true);
  });

  it('rechaza LINEA_SIMPLE inválida', async () => {
    const board = { /* sin líneas completas */ };
    expect(await verifyVictory('LINEA_SIMPLE', board)).toBe(false);
  });

  it('valida CUATRO_ESQUINAS', async () => {
    const board = { /* solo esquinas marcadas */ };
    expect(await verifyVictory('CUATRO_ESQUINAS', board)).toBe(true);
  });
});
```

---

## 🔗 Documentos Relacionados

- [Arquitectura del Sistema](./ARCHITECTURE.md)
- [Eventos de Socket.IO](./SOCKET_EVENTS.md)
- [Esquema de Base de Datos](./DATABASE.md)
