

## Plan: Mejoras a la Landing Page de Hijuelos Espadin

### 1. Eliminar texto "Gave" del header

**Archivo**: `src/pages/HijuelosEspadin.tsx`

Eliminar el `<span className="font-bold">Gave</span>` del header, dejando solo el logotipo.

### 2. Mejorar visibilidad del boton "Simular Rentabilidad" en el hero

**Archivo**: `src/components/hijuelos/HijuelosHero.tsx`

Cambiar el estilo del boton outline para que sea visualmente distinguible del fondo oscuro. Se usara un fondo blanco semi-transparente con texto blanco y borde blanco visible, en lugar del outline transparente actual.

### 3. Actualizar contenido sobre Denominacion de Origen

**Archivo**: `src/components/hijuelos/HijuelosBeneficios.tsx`

Reescribir la seccion de regiones y el card de Denominacion de Origen para reflejar correctamente que:
- Las plantas estan en parcelas de la Huasteca Potosina
- Los estados vecinos con DO de mezcal son candidatos ideales por cercania y logistica
- El factor clave es el clima: humedad adecuada y ausencia historica de heladas
- No es exclusivo de esos estados, pero les resulta mas conveniente comprar espadin de la Huasteca que de Oaxaca

### 4. Agregar imagenes reales de agave

Copiar las 7 imagenes subidas al proyecto y distribuirlas en las secciones de la landing:

- **Hero**: Usar la imagen de la plantacion con trabajadores (`Copia_de_DSC_0477_3_-min.JPG`) como fondo o imagen destacada
- **Beneficios**: Usar la imagen panoramica de plantacion (`Espadin1.jpg`)
- **Precios/Producto**: Usar las fotos de hijuelos individuales (`IMG_4597.JPG`, `IMG_4598.JPG`, `IMG_4601.JPG`) en una galeria o carrusel
- **Servicios**: Usar la imagen de carga de hijuelos (`2138b49e...jpg`)
- **Hero o seccion visual**: Usar la foto de raices (`IMG_4599.JPG`) y la plantacion (`Espadin.jpg`)

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/pages/HijuelosEspadin.tsx` | Eliminar texto "Gave" del header |
| `src/components/hijuelos/HijuelosHero.tsx` | Mejorar boton "Simular Rentabilidad", agregar imagen de fondo |
| `src/components/hijuelos/HijuelosBeneficios.tsx` | Actualizar texto de DO y regiones, agregar imagen |
| `src/components/hijuelos/HijuelosPrecios.tsx` | Agregar galeria de fotos de hijuelos |
| `src/components/hijuelos/HijuelosServicios.tsx` | Agregar imagen de operaciones |

### Detalles tecnicos

- Las imagenes se copiaran a `src/assets/hijuelos/` y se importaran como modulos ES6
- Se optimizara el layout para mostrar las imagenes de forma responsive
- El boton "Simular Rentabilidad" usara clases como `bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30` para mayor contraste
- El contenido de regiones se reestructurara para enfatizar la ventaja logistica de comprar desde la Huasteca

