import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/motion/Reveal';
import { useLanguage } from '@/hooks/useLanguage';

const FinalCTA = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          eyebrow: 'Talk to us',
          title: "Let's talk agave.",
          body: 'Tell us who you are and what you are looking for: agave for your production, Tajacú for your bar or market, or a project on your land. We will come back with a concrete route.',
          primary: 'Get in touch',
          secondary: 'Write an email',
        }
      : {
          eyebrow: 'Hablemos',
          title: 'Hablemos de agave.',
          body: 'Cuéntanos quién eres y qué buscas: agave para tu producción, Tajacú para tu barra o tu mercado, o un proyecto en tu tierra. Te respondemos con una ruta concreta.',
          primary: 'Escríbenos',
          secondary: 'Enviar un correo',
        };

  return (
    <section id="contacto" className="section-pad bg-ink-deep text-paper">
      <div className="container mx-auto">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-paper/60">{c.eyebrow}</p>
          <h2 className="display-lg mt-4 text-paper">{c.title}</h2>
          <p className="mt-6 text-paper/70">{c.body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contacto">{c.primary}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              <a href="mailto:hola@gaveagro.com">{c.secondary}</a>
            </Button>
          </div>
          <p className="mt-8 text-sm text-paper/50">hola@gaveagro.com</p>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
