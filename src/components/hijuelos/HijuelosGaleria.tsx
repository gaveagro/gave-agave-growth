import parcela1 from '@/assets/hijuelos/parcela-agave-cielo.jpg';
import parcela2 from '@/assets/hijuelos/parcela-panoramica.jpg';
import parcela3 from '@/assets/hijuelos/parcela-atardecer.jpg';
import silvopastoreo from '@/assets/hijuelos/silvopastoreo-borregos.jpg';
import borregos from '@/assets/hijuelos/borregos-parcela.jpg';
import panoramica from '@/assets/hijuelos/espadin-panoramica.jpg';
import { MapPin } from 'lucide-react';

const fotos = [
  { src: parcela1, alt: 'Agave espadín adulto en parcela de la Huasteca Potosina', span: 'md:col-span-2 md:row-span-2' },
  { src: parcela3, alt: 'Plantación de agave espadín al atardecer' },
  { src: panoramica, alt: 'Vista panorámica de la plantación con serranía de fondo' },
  { src: silvopastoreo, alt: 'Silvopastoreo: borregos aprovechando residuos vegetales en la parcela' },
  { src: parcela2, alt: 'Hileras de agave espadín en pleno desarrollo' },
  { src: borregos, alt: 'Manejo integrado con borregos en parcela de espadín' },
];

const HijuelosGaleria = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Huasteca Potosina
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nuestras Parcelas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Fotografías reales de nuestras plantaciones de agave espadín. Suelo pedregoso, clima cálido y 
            manejo agroecológico con integración de ganadería en el mismo terreno.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[220px] gap-3 max-w-6xl mx-auto">
          {fotos.map((f, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden shadow-md group ${f.span ?? ''}`}
            >
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs leading-snug">{f.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Fotografías tomadas en nuestras parcelas de trabajo. El manejo silvopastoril (integración con borregos) 
          es parte de nuestra visión regenerativa: los animales ayudan al control de malezas y aportan materia orgánica.
        </p>
      </div>
    </section>
  );
};

export default HijuelosGaleria;
