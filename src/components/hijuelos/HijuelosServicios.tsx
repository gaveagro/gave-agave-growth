import { Sprout, PhoneCall, FileCheck, Handshake } from 'lucide-react';
import cargaImg from '@/assets/hijuelos/carga-hijuelos.jpg';

const servicios = [
  {
    icon: Sprout,
    title: 'Asesoría en Establecimiento',
    description: 'Te guiamos en el arranque de tu plantación: preparación del terreno, diseño de plantación y técnicas de trasplante.'
  },
  {
    icon: PhoneCall,
    title: 'Acompañamiento Durante el Ciclo',
    description: 'Mantenemos contacto contigo para recomendaciones de manejo: control de plagas, malezas, fertilización y labores culturales.'
  },
  {
    icon: FileCheck,
    title: 'Registro ante Consejos Reguladores',
    description: 'Te orientamos en el proceso para dar de alta tu plantación ante el Consejo Regulador del Mezcal para obtener la Denominación de Origen.'
  },
  {
    icon: Handshake,
    title: 'Posible Compra de Cosecha',
    description: 'Dependiendo del volumen de compra de hijuelos, podemos acordar la compra de tu cosecha de agave al momento de la madurez.'
  }
];

const HijuelosServicios = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ¿Qué Incluye Nuestra Oferta?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No solo vendemos plantas. Te acompañamos en todo el proceso para maximizar tu éxito como productor de agave.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          <div className="space-y-8">
            {servicios.map((s, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={cargaImg} alt="Carga y transporte de hijuelos de agave espadín" className="w-full h-96 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HijuelosServicios;
