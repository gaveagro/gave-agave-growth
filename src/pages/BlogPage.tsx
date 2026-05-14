import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Blog from '@/components/Blog';
import SEO from '@/components/SEO';

const BlogPage = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'ES';
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
      backToHome: 'Back to Home'
    },
    ES: {
      backToHome: 'Volver al Inicio'
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog — Gavé Agrotecnología"
        description="Artículos sobre agave, agricultura regenerativa, mercado del mezcal y oportunidades de inversión sustentable en México."
        canonical="https://gaveagro.com/blog"
      />
      <Header />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center space-x-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span>{currentContent.backToHome}</span>
            </Button>
          </Link>
        </div>
        
        <Blog />
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;