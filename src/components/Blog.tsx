import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, User } from 'lucide-react';

const Blog = () => {
  // Get initial language from window object or default to EN
  const [language, setLanguage] = useState(() => {
    // Check if there's a stored language preference or get from a global state
    return (window as any).currentLanguage || 'EN';
  });

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
      // Also store it globally so other components can access it
      (window as any).currentLanguage = event.detail;
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Check for initial language state
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, [language]);

  const content = {
    EN: {
      title: 'Latest Insights & News',
      subtitle: 'Stay updated with our latest research, impact reports, and insights from the world of sustainable agave investment.',
      viewAll: 'View All Articles',
      readMore: 'Read More',
      research: 'Research',
      impactReport: 'Impact Report',
      community: 'Community'
    },
    ES: {
      title: 'Últimas Noticias y Análisis',
      subtitle: 'Mantente actualizado con nuestras últimas investigaciones, reportes de impacto y análisis del mundo de la inversión sustentable en agave.',
      viewAll: 'Ver Todos los Artículos',
      readMore: 'Leer Más',
      research: 'Investigación',
      impactReport: 'Reporte de Impacto',
      community: 'Comunidad'
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Agriculture: Why Agave is Leading the Way",
      titleES: "El Futuro de la Agricultura Sustentable: Por qué el Agave Lidera el Camino",
      excerpt: "Discover how agave cultivation is revolutionizing sustainable agriculture while providing exceptional returns for investors.",
      excerptES: "Descubre cómo el cultivo de agave está revolucionando la agricultura sustentable mientras proporciona retornos excepcionales para los inversionistas.",
      author: "Gavé Research Team",
      authorES: "Equipo de Investigación Gavé",
      date: "2024-03-15",
      category: "Research",
      categoryES: "Investigación",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Carbon Sequestration in Agave: Measuring Our Environmental Impact",
      titleES: "Captura de Carbono en Agave: Midiendo Nuestro Impacto Ambiental",
      excerpt: "Learn about our latest findings on carbon sequestration rates in our agave plantations and their contribution to climate action.",
      excerptES: "Conoce nuestros últimos hallazgos sobre las tasas de captura de carbono en nuestras plantaciones de agave y su contribución a la acción climática.",
      author: "Dr. María González",
      authorES: "Dra. María González",
      date: "2024-03-10",
      category: "Impact Report",
      categoryES: "Reporte de Impacto",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Community Development in San Luis Potosí: 5 Years of Progress",
      titleES: "Desarrollo Comunitario en San Luis Potosí: 5 Años de Progreso",
      excerpt: "A comprehensive look at how our operations have transformed local communities through sustainable employment and training programs.",
      excerptES: "Una mirada integral a cómo nuestras operaciones han transformado las comunidades locales a través de empleo sustentable y programas de capacitación.",
      author: "Carlos Mendoza",
      authorES: "Carlos Mendoza",
      date: "2024-03-05",
      category: "Community",
      categoryES: "Comunidad",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const currentContent = content[language as keyof typeof content];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={language === 'EN' ? post.title : post.titleES}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {language === 'EN' ? post.category : post.categoryES}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                  {language === 'EN' ? post.title : post.titleES}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {language === 'EN' ? post.excerpt : post.excerptES}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{language === 'EN' ? post.author : post.authorES}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    {currentContent.readMore}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            {currentContent.viewAll}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
