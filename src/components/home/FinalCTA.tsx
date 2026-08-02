import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';
import InvestmentModal from '@/components/InvestmentModal';

const FinalCTA = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'Talk to us',
          title: 'Bring us a hectare, a ranch, or a mandate.',
          body: 'We work with impact funds, NGOs, governments, corporates and arid-land ranch owners. Tell us where you stand and we will come back with a concrete route.',
          primary: 'Start a conversation',
          secondary: 'Certify my ranch',
        }
      : {
          eyebrow: 'Hablemos',
          title: 'Tráenos una hectárea, un rancho o un mandato.',
          body: 'Trabajamos con fondos de impacto, ONGs, gobiernos, empresas y dueños de rancho en zonas áridas. Cuéntanos dónde estás y te regresamos una ruta concreta.',
          primary: 'Iniciar una conversación',
          secondary: 'Certificar mi rancho',
        };

  return (
    <section id="contacto" className="section-pad bg-ink-deep text-paper">
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-paper/60">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 text-paper">{c.title}</h2>
          <p className="mt-6 text-paper/70">{c.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <InvestmentModal>
              <Button size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
                {c.primary}
              </Button>
            </InvestmentModal>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              <Link to="/bonos-de-carbono">{c.secondary}</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-paper/50">hola@gaveagro.com</p>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
