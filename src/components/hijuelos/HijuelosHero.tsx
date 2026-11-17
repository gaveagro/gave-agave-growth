import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImg from '@/assets/hijuelos/plantacion-trabajadores.jpg';

const HijuelosHero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Plantación de agave espadín" width={1920} height={1080} fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
            🌱 Venta de Hijuelos de Agave Espadín
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Hijuelos de{' '}
            <span className="text-gave-yellow">Agave Espadín</span>
            <br />
            para la Huasteca Potosina
          </h1>

          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Plantas de hijuelos adaptadas a la Huasteca Potosina y regiones con Denominación de Origen de Mezcal. 
            De temporal, resistentes y de la especie más usada en mezcal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gave-yellow text-foreground hover:opacity-90 text-lg px-8 py-6 font-semibold"
            >
              Solicitar Cotización
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">20–30</p>
              <p className="text-white/90 text-sm">cm de talla típica</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">0</p>
              <p className="text-white/90 text-sm">Riego requerido</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">5-6</p>
              <p className="text-white/90 text-sm">Años a cosecha</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  );
};

export default HijuelosHero;
