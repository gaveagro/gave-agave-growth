import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';
import heroAsset from '@/assets/homepage/homepage-hero.jpg.asset.json';

const HomeHero = () => {
  const language = useLanguage();
  const reduce = useReducedMotion();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'Arid land · Mexico',
          title: 'We regenerate arid land,',
          titleAccent: 'and make it measurable.',
          body:
            'Gavé designs agave-based agroforestry and silvopastoral systems: carbon capture, regenerative livestock, water harvesting and monitoring — built so the outcome can be verified and certified.',
          primary: 'See the model',
          secondary: 'Invest or certify your ranch',
          scroll: 'Scroll',
        }
      : {
          eyebrow: 'Zonas áridas · México',
          title: 'Regeneramos tierras áridas,',
          titleAccent: 'y lo hacemos medible.',
          body:
            'Gavé diseña sistemas agroforestales y agrosilvopastoriles basados en agave: captura de carbono, ganadería regenerativa, cosecha de agua y monitoreo — construidos para que el resultado se pueda verificar y certificar.',
          primary: 'Ver el modelo',
          secondary: 'Invertir o certificar tu rancho',
          scroll: 'Desliza',
        };

  return (
    <section id="home" className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink-deep pt-24">
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt={
            language === 'EN'
              ? 'Agave plantation regenerating arid land in San Luis Potosí'
              : 'Plantación de agave regenerando tierras áridas en San Luis Potosí'
          }
          className="h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/30" />
      </div>

      <div className="container relative z-10 mx-auto pb-20 pt-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="eyebrow text-paper/70">
            <span className="inline-block h-1.5 w-1.5 bg-accent" />
            {c.eyebrow}
          </p>

          <h1 className="display-xl mt-6 text-paper">
            {c.title}
            <span className="block text-accent">{c.titleAccent}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/80 md:text-xl">{c.body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#modelo">
                {c.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              <Link to="/inversion-de-impacto">{c.secondary}</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/50 md:flex">
        <span className="text-[10px] uppercase tracking-[0.2em]">{c.scroll}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
};

export default HomeHero;
