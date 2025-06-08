
import { useState, useEffect } from 'react';

const TrustedPartners = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'EN';
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
      title: 'Confiamos en Organizaciones Líderes'
    }
  };

  const partners = [
    {
      name: 'Startup Bootcamp',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center'
    },
    {
      name: 'Techstars',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center'
    },
    {
      name: 'Y Combinator',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center'
    },
    {
      name: 'Partner 4',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop&crop=center'
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 hover:opacity-80 transition-opacity duration-300">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
