
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import InvestmentModal from './InvestmentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'ES' : 'EN';
    setLanguage(newLanguage);
    // Store globally for other components
    (window as any).currentLanguage = newLanguage;
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }));
  };

  const navItems = {
    EN: {
      home: 'Home',
      impact: 'Impact',
      howItWorks: 'How it Works',
      blog: 'Blog',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      startInvesting: 'Start Investing'
    },
    ES: {
      home: 'Inicio',
      impact: 'Impacto',
      howItWorks: 'Cómo Funciona',
      blog: 'Blog',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      startInvesting: 'Comenzar a Invertir'
    }
  };

  const currentNav = navItems[language as keyof typeof navItems];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png" 
              alt="Gavé"
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              {currentNav.home}
            </a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">
              {currentNav.impact}
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              {currentNav.howItWorks}
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors">
              {currentNav.blog}
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              {currentNav.faq}
            </a>
            <a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              {currentNav.dashboard}
            </a>
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </Button>
            <InvestmentModal>
              <Button className="bg-primary hover:bg-primary/90">
                {currentNav.startInvesting}
              </Button>
            </InvestmentModal>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.home}
              </a>
              <a href="#impact" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.impact}
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.howItWorks}
              </a>
              <a href="#blog" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.blog}
              </a>
              <a href="#faq" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.faq}
              </a>
              <a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-foreground hover:text-primary">
                {currentNav.dashboard}
              </a>
              <div className="flex items-center justify-between px-3 py-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language}</span>
                </Button>
                <InvestmentModal>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    {currentNav.startInvesting}
                  </Button>
                </InvestmentModal>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
