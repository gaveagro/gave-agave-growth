
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const content = {
    EN: {
      description: 'Technology-driven sustainable agave investment delivering profitable returns while regenerating land and supporting communities.',
      investmentTitle: 'Investment',
      howItWorks: 'How it Works',
      impact: 'Impact',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      resourcesTitle: 'Resources',
      blog: 'Blog',
      contact: 'Contact',
      copyright: '© 2025 Gavé. All rights reserved.',
      privacy: 'Privacy Policy'
    },
    ES: {
      description: 'Inversión sustentable en agave impulsada por tecnología que entrega retornos rentables mientras regenera tierras y apoya comunidades.',
      investmentTitle: 'Inversión',
      howItWorks: 'Cómo Funciona',
      impact: 'Impacto',
      faq: 'FAQ',
      dashboard: 'Dashboard',
      resourcesTitle: 'Recursos',
      blog: 'Blog',
      contact: 'Contacto',
      copyright: '© 2025 Gavé. Todos los derechos reservados.',
      privacy: 'Política de Privacidad'
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png" 
                alt="Gavé" 
                className="w-10 h-10 object-contain"
              />
              <span className="ml-2 text-xl font-bold">Gavé</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              {currentContent.description}
            </p>
            <div className="space-y-2 text-sm">
              <p>San Luis Potosí, México</p>
              <p>hola@gaveagro.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{currentContent.investmentTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="text-primary-foreground/80 hover:text-primary-foreground">{currentContent.howItWorks}</a></li>
              <li><a href="#impact" className="text-primary-foreground/80 hover:text-primary-foreground">{currentContent.impact}</a></li>
              <li><a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground">{currentContent.faq}</a></li>
              <li><a href="https://dashboard.gaveagro.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">{currentContent.dashboard}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{currentContent.resourcesTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground">{currentContent.blog}</a></li>
              
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm">
              {currentContent.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">{currentContent.privacy}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
