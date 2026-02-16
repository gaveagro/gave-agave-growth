import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HijuelosHero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero-gave overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, hsl(45 100% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, hsl(140 60% 25% / 0.1) 0%, transparent 50%)'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="inline-block bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            🌱 Venta de Hijuelos de Agave Espadín
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Invierte en{' '}
            <span className="text-gave-yellow">Agave Espadín</span>
            <br />
            Cultivo de Alta Rentabilidad
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Plantas de hijuelos adaptadas a la Huasteca Potosina y regiones con Denominación de Origen de Mezcal. 
            Sin riego, alta resistencia y retorno probado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gave-yellow text-foreground hover:opacity-90 text-lg px-8 py-6 font-semibold"
            >
              Solicitar Cotización
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
            >
              Simular Rentabilidad
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">$25-$45</p>
              <p className="text-primary-foreground/70 text-sm">Por hijuelo</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">0</p>
              <p className="text-primary-foreground/70 text-sm">Riego requerido</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gave-yellow">5-6</p>
              <p className="text-primary-foreground/70 text-sm">Años a cosecha</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HijuelosHero;
