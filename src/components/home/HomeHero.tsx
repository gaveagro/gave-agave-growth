import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';

const HomeHero = () => {
  const language = useLanguage();
  const reduce = useReducedMotion();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'San Luis Potosí · Mexico',
          title: 'Agave that regenerates the land,',
          titleAccent: 'grown with the people who live on it.',
          body:
            'Gavé grows Espadín and Salmiana with 50 partner families across some 500 hectares of San Luis Potosí. We supply that agave to beverage, inulin and syrup producers, and we are the group behind Tajacú mezcal.',
          primary: 'Quote our harvest',
          secondary: 'Discover Tajacú',
          scroll: 'Scroll',
          alt: 'Agave field in San Luis Potosí',
        }
      : {
          eyebrow: 'San Luis Potosí · México',
          title: 'Agave que regenera la tierra,',
          titleAccent: 'cultivado con quienes la habitan.',
          body:
            'Gavé cultiva Espadín y Salmiana con 50 familias socias en cerca de 500 hectáreas de San Luis Potosí. Abastecemos ese agave a productores de bebidas, inulina y jarabe, y somos el grupo detrás del mezcal Tajacú.',
          primary: 'Cotiza nuestra cosecha',
          secondary: 'Conoce Tajacú',
          scroll: 'Desliza',
          alt: 'Parcela de agave en San Luis Potosí',
        };

  return (
    <section id="home" className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink-deep pt-24">
      <div className="absolute inset-0">
        <img src="/images/home/hero-huasteca.jpg" alt={c.alt} className="h-full w-full object-cover" decoding="async" />
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
              <a href="#materia-prima">
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
              <a href="#tajacu">{c.secondary}</a>
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
