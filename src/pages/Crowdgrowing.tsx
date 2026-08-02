import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HowSustainableAgave from '@/components/HowSustainableAgave';
import InvestmentSimulator from '@/components/InvestmentSimulator';
import MonitoringPlatform from '@/components/MonitoringPlatform';
import AgaveMarket from '@/components/AgaveMarket';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const Crowdgrowing = () => {
  const language = useLanguage();
  const en = language === 'EN';

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={en ? 'Crowdgrowing: invest in agave plants | Gavé' : 'Crowdgrowing: invierte en plantas de agave | Gavé'}
        description={
          en
            ? 'Acquire agave plants established by Gavé in San Luis Potosí, follow them by satellite and share the harvest revenue.'
            : 'Adquiere plantas de agave establecidas por Gavé en San Luis Potosí, síguelas por satélite y participa del ingreso de la cosecha.'
        }
        canonical="https://gaveagro.com/crowdgrowing"
      />
      <Header />

      <section className="section-pad bg-ink pt-40 text-paper">
        <div className="container mx-auto">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-paper/60">
              <span className="inline-block h-1.5 w-1.5 bg-accent" />
              {en ? 'Individual investors' : 'Inversionistas individuales'}
            </p>
            <h1 className="display-xl mt-6 text-paper">{en ? 'Crowdgrowing' : 'Crowdgrowing'}</h1>
            <p className="mt-6 text-lg text-paper/75">
              {en
                ? 'The original Gavé model: you acquire plants we establish and manage in San Luis Potosí, follow them on the monitoring platform, and participate in the harvest revenue at the end of the cycle.'
                : 'El modelo original de Gavé: adquieres plantas que establecemos y manejamos en San Luis Potosí, las sigues en la plataforma de monitoreo y participas del ingreso de la cosecha al final del ciclo.'}
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-paper/60">
              {en
                ? 'Straight talk: the agave price per kilo is cyclical and is currently in the low part of the cycle. Crowdgrowing remains open, but it is no longer the centre of what Gavé does — our work today is built around restoration, environmental credits and nursery supply, where value does not depend on a single spot price.'
                : 'Hablando claro: el precio del kilo de agave es cíclico y hoy está en la parte baja del ciclo. El crowdgrowing sigue abierto, pero ya no es el centro de lo que hace Gavé: nuestro trabajo hoy se construye alrededor de la restauración, los bonos ambientales y el abasto de planta, donde el valor no depende de un solo precio spot.'}
            </p>
          </Reveal>
        </div>
      </section>

      <HowSustainableAgave />
      <InvestmentSimulator />
      <AgaveMarket />
      <MonitoringPlatform />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Crowdgrowing;
