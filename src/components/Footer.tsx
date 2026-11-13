import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const language = useLanguage();

  const c =
    language === 'EN'
      ? {
          description:
            'Agave grown on regenerated land with partner communities in San Luis Potosí. Raw material for beverages, inulin and syrup, and the group behind Tajacú mezcal.',
          copyright: '© 2026 Gavé. All rights reserved.',
          tajacu: 'Gavé is the group behind Tajacú.',
          privacy: 'Privacy Policy',
          colWork: 'What we do',
          colCompany: 'Company',
          links: [
            { label: 'Agave raw material', to: '/#materia-prima' },
            { label: 'Tajacú mezcal', to: 'https://www.tajacu.com' },
            { label: 'Services', to: '/servicios' },
            { label: 'Nursery — Espadín & Salmiana', to: '/vivero' },
            { label: 'Espadín pups', to: '/hijuelos-espadin' },
          ],
          company: [
            { label: 'Contact', to: '/contacto' },
            { label: 'Blog', to: '/blog' },
            { label: 'Investors (crowdgrowing)', to: '/inversion-de-impacto' },
            { label: 'Investor dashboard', to: 'https://dashboard.gaveagro.com' },
          ],
        }
      : {
          description:
            'Agave cultivado en tierras regeneradas con comunidades socias en San Luis Potosí. Materia prima para bebidas, inulina y jarabe, y el grupo detrás del mezcal Tajacú.',
          copyright: '© 2026 Gavé. Todos los derechos reservados.',
          tajacu: 'Gavé es el grupo detrás de Tajacú.',
          privacy: 'Política de Privacidad',
          colWork: 'Qué hacemos',
          colCompany: 'Compañía',
          links: [
            { label: 'Materia prima de agave', to: '/#materia-prima' },
            { label: 'Mezcal Tajacú', to: 'https://www.tajacu.com' },
            { label: 'Servicios', to: '/servicios' },
            { label: 'Vivero — Espadín y Salmiana', to: '/vivero' },
            { label: 'Hijuelos de espadín', to: '/hijuelos-espadin' },
          ],
          company: [
            { label: 'Contacto', to: '/contacto' },
            { label: 'Blog', to: '/blog' },
            { label: 'Inversionistas (crowdgrowing)', to: '/inversion-de-impacto' },
            { label: 'Dashboard de inversionistas', to: 'https://dashboard.gaveagro.com' },
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
