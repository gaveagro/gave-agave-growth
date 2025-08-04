import { useState, useEffect } from 'react';

const Footer = () => {
  const [language, setLanguage] = useState('ES');

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
      copyright: '© 2025 Gavé. All rights reserved.',
      privacy: 'Privacy Policy'
    },
    ES: {
      description: 'Inversión sustentable en agave impulsada por tecnología que entrega retornos rentables mientras regenera tierras y apoya comunidades.',
      copyright: '© 2025 Gavé. Todos los derechos reservados.',
      privacy: 'Política de Privacidad'
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/4c7e4344-7b1e-4dac-8922-7356da9646e3.png" 
                alt="Gavé" 
                className="w-10 h-10 object-contain"
              />
              <span className="ml-2 text-xl font-bold">Gavé</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {currentContent.description}
            </p>
            <div className="space-y-2 text-sm">
              <p>San Luis Potosí, México</p>
              <p>hola@gaveagro.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              {currentContent.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-600 hover:text-gray-800 text-sm">{currentContent.privacy}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;