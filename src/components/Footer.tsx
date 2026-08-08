import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          description:
            'Regenerative agroforestry and silvopastoral systems built on agave. Restoring arid land in Mexico, with measurable climate outcomes.',
          copyright: '© 2026 Gavé. All rights reserved.',
          tajacu: 'Part of Grupo Tajacú.',
          privacy: 'Privacy Policy',
          colWork: 'What we do',
          colCompany: 'Company',
          links: [
            { label: 'Impact investment', to: '/inversion-de-impacto' },
            { label: 'Carbon credits for ranches', to: '/bonos-de-carbono' },
            { label: 'Nursery — Espadín & Salmiana', to: '/vivero' },
            { label: 'Offset & sponsorship', to: '/compensa' },
            { label: 'Crowdgrowing', to: '/crowdgrowing' },
          ],
          company: [
            { label: 'Contact', to: '/contacto' },
            { label: 'Blog', to: '/blog' },
            { label: 'FAQ', to: '/#faq' },
            { label: 'Dashboard', to: 'https://dashboard.gaveagro.com' },
          ],
        }
      : {
          description:
            'Sistemas agroforestales y agrosilvopastoriles regenerativos basados en agave. Restauramos tierras áridas en México con resultados climáticos medibles.',
          copyright: '© 2026 Gavé. Todos los derechos reservados.',
          tajacu: 'Parte de Grupo Tajacú.',
          privacy: 'Política de Privacidad',
          colWork: 'Qué hacemos',
          colCompany: 'Compañía',
          links: [
            { label: 'Inversión de impacto', to: '/inversion-de-impacto' },
            { label: 'Bonos de carbono para ranchos', to: '/bonos-de-carbono' },
            { label: 'Vivero — Espadín y Salmiana', to: '/vivero' },
            { label: 'Compensa y patrocina', to: '/compensa' },
            { label: 'Crowdgrowing', to: '/crowdgrowing' },
          ],
          company: [
            { label: 'Contacto', to: '/contacto' },
            { label: 'Blog', to: '/blog' },
            { label: 'Preguntas frecuentes', to: '/#faq' },
            { label: 'Dashboard', to: 'https://dashboard.gaveagro.com' },
          ],
        };

  const renderLink = (l: { label: string; to: string }) =>
    l.to.startsWith('http') || l.to.includes('#') ? (
      <a key={l.to} href={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        {l.label}
      </a>
    ) : (
      <Link key={l.to} to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        {l.label}
      </Link>
    );

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png"
                alt="Gavé"
                className="h-10 w-10 object-contain"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>San Luis Potosí, México</p>
              <a href="mailto:hola@gaveagro.com" className="hover:text-foreground">
                hola@gaveagro.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">{c.colWork}</p>
            {c.links.map(renderLink)}
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">{c.colCompany}</p>
            {c.company.map(renderLink)}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            {c.copyright} <span className="text-muted-foreground/70">{c.tajacu}</span>
          </p>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            {c.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
