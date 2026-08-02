import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import InvestmentModal from './InvestmentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const language = useLanguage();
  const { pathname } = useLocation();

  const toggleLanguage = () => {
    const newLanguage = language === 'ES' ? 'EN' : 'ES';
    (window as any).currentLanguage = newLanguage;
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  const nav =
    language === 'EN'
      ? [
          { label: 'The model', to: '/#modelo' },
          { label: 'Impact investment', to: '/inversion-de-impacto' },
          { label: 'Carbon credits', to: '/bonos-de-carbono' },
          { label: 'Nursery', to: '/vivero' },
          { label: 'Offset', to: '/compensa' },
          { label: 'Blog', to: '/blog' },
        ]
      : [
          { label: 'El modelo', to: '/#modelo' },
          { label: 'Inversión de impacto', to: '/inversion-de-impacto' },
          { label: 'Bonos de carbono', to: '/bonos-de-carbono' },
          { label: 'Vivero', to: '/vivero' },
          { label: 'Compensa', to: '/compensa' },
          { label: 'Blog', to: '/blog' },
        ];

  const cta = language === 'EN' ? 'Talk to us' : 'Agendar llamada';

  const renderLink = (item: { label: string; to: string }, mobile = false) => {
    const isHash = item.to.includes('#');
    const cls = mobile
      ? 'block px-1 py-3 text-base text-foreground/80 hover:text-foreground border-b border-border/60'
      : 'text-sm text-foreground/70 hover:text-foreground transition-colors';
    const active = !isHash && pathname === item.to;
    if (isHash) {
      return (
        <a key={item.to} href={item.to} className={cls} onClick={() => setIsMenuOpen(false)}>
          {item.label}
        </a>
      );
    }
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`${cls} ${active ? 'text-foreground font-medium' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Link to="/" className="flex items-center" aria-label="Gavé">
            <img
              src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png"
              alt="Gavé"
              className="h-11 w-11 object-contain md:h-12 md:w-12"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">{nav.map((i) => renderLink(i))}</nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-1.5">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{language}</span>
            </Button>
            <InvestmentModal>
              <Button size="sm" className="rounded-none px-5">
                {cta}
              </Button>
            </InvestmentModal>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-1.5">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{language}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border py-4 lg:hidden">
            {nav.map((i) => renderLink(i, true))}
            <div className="pt-4">
              <InvestmentModal>
                <Button className="w-full rounded-none">{cta}</Button>
              </InvestmentModal>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
