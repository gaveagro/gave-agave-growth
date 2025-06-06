
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'ES' : 'EN');
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=40&h=40&fit=crop&crop=center" 
              alt="Gavé Agro"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="ml-2 text-xl font-bold text-primary">Gavé Agro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              {language === 'EN' ? 'Home' : 'Inicio'}
            </a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">
              {language === 'EN' ? 'Impact' : 'Impacto'}
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              {language === 'EN' ? 'How it Works' : 'Cómo Funciona'}
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              Dashboard
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
            <Button className="bg-primary hover:bg-primary/90">
              {language === 'EN' ? 'Start Investing' : 'Comenzar a Invertir'}
            </Button>
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
                {language === 'EN' ? 'Home' : 'Inicio'}
              </a>
              <a href="#impact" className="block px-3 py-2 text-foreground hover:text-primary">
                {language === 'EN' ? 'Impact' : 'Impacto'}
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-foreground hover:text-primary">
                {language === 'EN' ? 'How it Works' : 'Cómo Funciona'}
              </a>
              <a href="#faq" className="block px-3 py-2 text-foreground hover:text-primary">
                FAQ
              </a>
              <a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-foreground hover:text-primary">
                Dashboard
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
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {language === 'EN' ? 'Start Investing' : 'Comenzar a Invertir'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
