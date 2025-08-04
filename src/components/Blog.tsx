
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, ArrowRight, User, Search } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useContent';

const Blog = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'ES';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { posts, loading, error } = useBlogPosts();

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
      (window as any).currentLanguage = event.detail;
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
      title: 'Latest Insights & News',
      subtitle: 'Stay updated with our latest research, impact reports, and insights from the world of sustainable agave investment.',
      viewAll: 'View All Articles',
      readMore: 'Read More',
      search: 'Search articles...',
      allCategories: 'All Categories',
      noResults: 'No articles found matching your search.'
    },
    ES: {
      title: 'Últimas Noticias y Análisis',
      subtitle: 'Mantente actualizado con nuestras últimas investigaciones, reportes de impacto y análisis del mundo de la inversión sustentable en agave.',
      viewAll: 'Ver Todos los Artículos',
      readMore: 'Leer Más',
      search: 'Buscar artículos...',
      allCategories: 'Todas las Categorías',
      noResults: 'No se encontraron artículos que coincidan con tu búsqueda.'
    }
  };

  const currentContent = content[language as keyof typeof content];

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    if (!post.published) return false;
    
    const title = language === 'EN' ? post.title_en : post.title_es;
    const excerpt = language === 'EN' ? post.excerpt_en : post.excerpt_es;
    const category = language === 'EN' ? post.category_en : post.category_es;
    
    const matchesSearch = searchTerm === '' || 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(
    posts
      .filter(post => post.published)
      .map(post => language === 'EN' ? post.category_en : post.category_es)
  ));

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Cargando artículos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-red-500">Error al cargar los artículos: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gave-blue">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={currentContent.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-input bg-background rounded-md"
            >
              <option value="all">{currentContent.allCategories}</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">{currentContent.noResults}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden border-gave-blue/20 cursor-pointer"
                    onClick={() => navigate(`/blog/${post.id}`)}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={language === 'EN' ? post.title_en : post.title_es}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="bg-gave-blue/10 text-gave-blue px-2 py-1 rounded-full text-xs">
                      {language === 'EN' ? post.category_en : post.category_es}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight hover:text-gave-blue transition-colors">
                    {language === 'EN' ? post.title_en : post.title_es}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {language === 'EN' ? post.excerpt_en : post.excerpt_es}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{language === 'EN' ? post.author_en : post.author_es}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gave-blue hover:text-gave-blue/80">
                      {currentContent.readMore}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
