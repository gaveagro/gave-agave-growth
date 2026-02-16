

## Plan: Landing Page de Venta de Hijuelos de Agave Espadin

### Resumen

Crear una nueva pagina `/hijuelos-espadin` como landing page independiente para campanas de venta de plantas de hijuelos de agave espadin, dirigida a productores y propietarios de tierra en regiones aptas para el cultivo.

### Estructura de la Landing Page

La pagina tendra las siguientes secciones:

1. **Hero** - Titulo llamativo con imagen de fondo de agave, CTA principal de contacto
2. **Propuesta de valor** - Beneficios clave del cultivo de espadin (sin riego, adaptado a la region, alta rentabilidad)
3. **Regiones objetivo** - Huasteca Potosina, municipios de Tamaulipas con DO mezcal, Aguascalientes, Guanajuato
4. **Precios y volumenes** - Tabla de precios segun talla y volumen ($25-$45 por hijuelo)
5. **Diseno de plantacion** - Densidad recomendada: 2,400 plantas/hectarea
6. **Simulador de rentabilidad del productor** - Herramienta interactiva donde el productor simula:
   - Numero de plantas a establecer
   - Peso por planta a cosecha (default 60 kg)
   - Precio por kg de venta ($6-$18)
   - Costo de cultivo por planta ($200-$250)
   - Tiempo de maduracion (5-6 anos)
   - Calculo de inversion total, ingresos brutos, costos totales y ganancia neta
7. **Servicios incluidos** - Asesoria tecnica, acompanamiento, guia de registro ante consejos reguladores
8. **Posible compra de cosecha** - Mencion de la posibilidad de comprar la cosecha dependiendo del volumen
9. **Formulario de contacto / CTA** - Formulario para que el productor solicite informacion o cotizacion

### Archivos a Crear

1. **`src/pages/HijuelosEspadin.tsx`** - Pagina principal de la landing
2. **`src/components/hijuelos/HijuelosHero.tsx`** - Seccion hero
3. **`src/components/hijuelos/HijuelosBeneficios.tsx`** - Beneficios y regiones
4. **`src/components/hijuelos/HijuelosPrecios.tsx`** - Tabla de precios
5. **`src/components/hijuelos/HijuelosSimulador.tsx`** - Simulador de rentabilidad
6. **`src/components/hijuelos/HijuelosServicios.tsx`** - Servicios y acompanamiento
7. **`src/components/hijuelos/HijuelosContacto.tsx`** - Formulario de contacto

### Archivos a Modificar

1. **`src/App.tsx`** - Agregar ruta `/hijuelos-espadin`

### Detalles Tecnicos

#### Simulador de Rentabilidad (componente principal)

Parametros de entrada:
- **Numero de plantas**: slider o input numerico (default: 2,400 - una hectarea)
- **Peso por planta a cosecha**: slider (rango 40-80 kg, default 60 kg)
- **Precio por kg**: slider (rango $6-$18, default $12)
- **Costo de cultivo por planta**: slider (rango $200-$250, default $225)
- **Tiempo de maduracion**: selector (5, 5.5, 6 anos)

Calculos:
```
Inversion en hijuelos = numPlantas * precioHijuelo (basado en volumen)
Costo total de cultivo = numPlantas * costoPorPlanta
Inversion total = inversionHijuelos + costoCultivo
Ingreso bruto = numPlantas * pesoPlanta * precioPorKg
Ganancia neta = ingresoBruto - inversionTotal
ROI total = (ganancia / inversionTotal) * 100
ROI anual = ROI total / anosMaduracion
```

#### Formulario de Contacto

Enviara datos via la misma edge function `form-submission` existente en Supabase, con un `formType` distinto (`hijuelos-espadin-lead`). Campos: nombre, telefono, email, municipio/region, numero estimado de plantas, mensaje.

#### Diseno Visual

- Reutiliza los colores del brand de Gave (verde, amarillo, arena)
- Header simplificado con logo y link de regreso a la pagina principal
- Footer reutilizado del componente existente
- Solo en espanol (es una campana local en Mexico)
- Responsive para movil (los productores probablemente veran esto desde su celular)

#### Precios del Hijuelo segun Volumen (para el simulador)

Se manejara un rango de $25-$45 por hijuelo. El simulador usara un precio promedio que el productor puede ajustar, o una tabla escalonada simplificada.

