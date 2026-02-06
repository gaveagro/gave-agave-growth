

## Plan: Actualizar Tiempo de Maduración Dinámico

### Situación Actual

La función `getMaturationYears()` (líneas 117-131) calcula los años restantes usando mayo como punto de referencia anual. Esto causa que los cálculos no coincidan exactamente con los valores esperados.

### Cambios Requeridos

Simplificar la función `getMaturationYears()` para calcular directamente la diferencia entre el año actual (2026) y el año de plantación, restándola del tiempo total de maduración:

| Año de Planta | Tiempo Total | Años Transcurridos | Tiempo Restante |
|---------------|--------------|-------------------|-----------------|
| 2026 | 5.5 años | 0 | 5.5 años |
| 2025 | 5.5 años | 1 | 4.5 años |
| 2024 | 5.5 años | 2 | 3.5 años |

### Archivo a Modificar

**`src/components/InvestmentSimulator.tsx`**

#### Cambio en la función `getMaturationYears()` (líneas 117-131)

Reemplazar la lógica actual con una versión simplificada:

```tsx
const getMaturationYears = () => {
  const totalMaturationYears = species[selectedSpecies as keyof typeof species].maturationYears;
  const currentYear = new Date().getFullYear(); // 2026
  
  // Calcular años transcurridos desde la plantación
  const yearsElapsed = currentYear - plantYear;
  
  // Restar del tiempo total de maduración
  const remainingYears = Math.max(0, totalMaturationYears - yearsElapsed);
  return remainingYears;
};
```

### Resultado Esperado

Con esta lógica y la fecha actual (febrero 2026):

**Para Espadín (5.5 años de maduración total):**
- Plantas 2026: 5.5 - 0 = **5.5 años restantes**
- Plantas 2025: 5.5 - 1 = **4.5 años restantes**
- Plantas 2024: 5.5 - 2 = **3.5 años restantes**

**Para Salmiana (7 años de maduración total):**
- Plantas 2026: 7 - 0 = **7 años restantes**
- Plantas 2025: 7 - 1 = **6 años restantes**
- Plantas 2024: 7 - 2 = **5 años restantes**

### Impacto en Cálculos Financieros

Los cálculos de ROI anual se ajustarán automáticamente porque ya usan `maturationYears` en la fórmula:

```tsx
const annualROI = totalROI / maturationYears;
```

Esto significa que plantas más antiguas (2024) mostrarán un ROI anual más alto debido al menor tiempo restante hasta la cosecha.

