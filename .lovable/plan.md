

## Plan: Actualización del Simulador de Inversión

### Cambios Requeridos

#### 1. Actualizar años de planta disponibles
- **Eliminar**: 2021, 2022, 2023
- **Mantener**: 2024, 2025
- **Añadir**: 2026

#### 2. Actualizar precios por año de planta
| Año | Precio (MXN) |
|-----|--------------|
| 2026 | $250 |
| 2025 | $300 |
| 2024 | $350 |

#### 3. Actualizar tiempo de maduración de Espadín
- **Antes**: 5 años
- **Después**: 5.5 años

El tiempo de maduración de Salmiana permanece en 7 años.

#### 4. Actualizar cálculos de ROI
El ROI anual se calculará usando 5.5 años para Espadín en lugar de 5 años.

### Archivos a Modificar

**`src/components/InvestmentSimulator.tsx`**:

1. **Línea 97**: Cambiar `maturationYears: 5` a `maturationYears: 5.5` en el objeto `species.espadín`

2. **Líneas 107-112**: Reemplazar la función `getPlantPrice` con una nueva lógica que use los precios específicos:
```tsx
const getPlantPrice = (year: number) => {
  const prices: { [key: number]: number } = {
    2024: 350,
    2025: 300,
    2026: 250
  };
  return prices[year] || 250;
};
```

3. **Líneas 185-186**: Actualizar el texto del selector de especies para mostrar "5.5 años" en lugar de "5 años"

4. **Líneas 200-205**: Reemplazar las opciones del selector de año de planta:
```tsx
<option value={2024}>2024 - $350 MXN</option>
<option value={2025}>2025 - $300 MXN</option>
<option value={2026}>2026 - $250 MXN</option>
```

### Detalles Técnicos

- El campo `maturationYears` cambiará de `number` entero a `number` decimal (5.5)
- Los cálculos de ROI ya usan `maturationYears` directamente, por lo que se actualizarán automáticamente
- El cálculo dinámico de años restantes (`getMaturationYears`) seguirá funcionando correctamente con el nuevo valor base de 5.5 años

