
import { useState, useEffect } from 'react';

const TrustedPartners = () => {
  const [language, setLanguage] = useState(() => {
    return (typeof window !== 'undefined' && (window as any).currentLanguage) || 'ES';
  });

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, [language]);

  const content = {
    EN: {
      title: 'Trusted by Leading Organizations'
    },
    ES: {
      title: 'Con la Confianza de Organizaciones Líderes'
    }
  };

  const partners = [
    {
      name: 'Startupbootcamp',
      logo: '/lovable-uploads/d188f725-f292-427a-b3da-bf180602c5d0.png',
      url: 'https://www.startupbootcamp.org/'
    },
    {
      name: 'Alterna',
      logo: '/lovable-uploads/15286fc7-6f4f-436f-b8df-b11e6871077f.png',
      url: 'https://alterna.pro/'
    },
    {
      name: 'AMMA',
      logo: '/lovable-uploads/118a9dcf-5b23-45db-8503-1554b1dd7725.png',
      url: 'https://www.amma.org.mx/'
    }
  ];

  const currentContent = content[language as keyof typeof content];

  return (
    <section className="py-16 bg-gave-sand/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gave-blue mb-8">
            {currentContent.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center opacity-60 hover:opacity-80 transition-opacity duration-300">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <a 
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
