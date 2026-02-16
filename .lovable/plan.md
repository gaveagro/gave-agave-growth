

## Plan: Cambiar campo "Región / Municipio" a texto libre

### Cambio

En `src/components/hijuelos/HijuelosContacto.tsx`, reemplazar el componente `Select` (dropdown con opciones limitadas) por un `Input` de texto libre, para que el productor escriba exactamente su municipio o región.

### Detalle técnico

**Archivo**: `src/components/hijuelos/HijuelosContacto.tsx`

- Eliminar el bloque `Select/SelectTrigger/SelectContent/SelectItem` del campo "Región / Municipio"
- Reemplazarlo por un `Input` de tipo texto con placeholder orientativo (ej. "Ej. Tamasopo, S.L.P.")
- Se puede eliminar el import de `Select, SelectContent, SelectItem, SelectTrigger, SelectValue` si ya no se usa en otro lado

