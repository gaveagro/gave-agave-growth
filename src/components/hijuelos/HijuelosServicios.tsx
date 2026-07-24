import { Sprout, PhoneCall, FileCheck, Handshake, Factory, ShoppingBag, Users } from 'lucide-react';
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
  }
];

const opcionesCosecha = [
  {
    icon: Handshake,
    title: 'Compramos tu cosecha',
    description: 'Podemos acordar la compra directa de tus piñas al momento de la madurez para elaborar mezcal.'
  },
  {
    icon: Factory,
    title: 'Procesamos juntos',
    description: 'Alianza productiva: procesamos las piñas de forma conjunta y compartimos el mezcal resultante.'
  },
  {
    icon: Users,
    title: 'Procesamos para ti',
    description: 'Nos encargamos de la cocción, fermentación y destilación de tus piñas para que obtengas tu propio mezcal.'
  },
  {
    icon: ShoppingBag,
    title: 'Te ayudamos a vender',
    description: 'Conectamos tu cosecha con compradores de piña por kg dentro de nuestra red comercial.'
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center mb-20">
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

        {/* Alternativas al momento de la cosecha */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Al momento de la cosecha
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Opciones flexibles para tu producción
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dependiendo del volumen de hijuelos que adquieras, podemos ofrecerte distintos caminos
              cuando tu agave esté listo para cosechar. Elige el que mejor se adapte a tu proyecto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opcionesCosecha.map((o, i) => (
              <div key={i} className="bg-secondary rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <o.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{o.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{o.description}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
            * Las opciones disponibles dependen del volumen del pedido inicial de hijuelos y se acuerdan por escrito antes de la venta.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HijuelosServicios;
