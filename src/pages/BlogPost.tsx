
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestmentModal from '@/components/InvestmentModal';
import { useBlogPosts } from '@/hooks/useContent';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = useBlogPosts();
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

  // Find the post by ID
  const post = posts.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'EN' ? 'Article not found' : 'Artículo no encontrado'}
          </h1>
          <Button onClick={() => navigate('/')}>
            {language === 'EN' ? 'Return to Home' : 'Volver al Inicio'}
          </Button>
        </div>
      </div>
    );
  }

  const content = {
    EN: {
      backToBlog: 'Back to Blog',
      shareArticle: 'Share Article',
      relatedArticles: 'Related Articles'
    },
    ES: {
      backToBlog: 'Volver al Blog',
      shareArticle: 'Compartir Artículo',
      relatedArticles: 'Artículos Relacionados'
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={post.image || '/images/farm1-min.jpg'} 
            alt={language === 'EN' ? post.title_en : post.title_es}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <div className="mb-4">
                <span className="bg-gave-blue px-3 py-1 rounded-full text-sm">
                  {language === 'EN' ? post.category_en : post.category_es}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                {language === 'EN' ? post.title_en : post.title_es}
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {language === 'EN' ? post.excerpt_en : post.excerpt_es}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-8 text-gave-blue hover:text-gave-blue/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentContent.backToBlog}
            </Button>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{language === 'EN' ? post.author_en : post.author_es}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              {/* Categories */}
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>
                  {(language === 'EN' ? post.category_en : post.category_es)
                    .split(',')
                    .map((cat: string) => cat.trim())
                    .join(', ')}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed space-y-6">
                {(language === 'EN' ? post.body_en : post.body_es)
                  .split('\n\n')
                  .filter(paragraph => paragraph.trim())
                  .map((paragraph, index) => {
                    // Handle headers
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-foreground">
                          {paragraph.replace('# ', '')}
                        </h1>
                      );
                    }
                    // Handle tables (basic table rendering)
                    if (paragraph.includes('|')) {
                      const lines = paragraph.split('\n').filter(line => line.trim());
                      if (lines.length > 2) {
                        return (
                          <div key={index} className="overflow-x-auto my-6">
                            <table className="min-w-full border-collapse border border-border">
                              <thead>
                                <tr className="bg-muted">
                                  {lines[0].split('|').filter(cell => cell.trim()).map((header, i) => (
                                    <th key={i} className="border border-border px-4 py-2 font-semibold text-left">
                                      {header.trim()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {lines.slice(2).map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.split('|').filter(cell => cell.trim()).map((cell, cellIndex) => (
                                      <td key={cellIndex} className="border border-border px-4 py-2">
                                        {cell.trim().replace(/\*\*(.*?)\*\*/g, '$1')}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    }
                    // Handle bold text and links
                    const processedText = paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
                    
                    return (
                      <div 
                        key={index} 
                        className="text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: processedText }}
                      />
                    );
                  })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gave-green/10 rounded-lg border border-gave-green/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gave-green">
                  {language === 'EN' ? 'Ready to Start Your Regenerative Investment?' : '¿Listo para Comenzar tu Inversión Regenerativa?'}
                </h3>
                <p className="text-lg mb-6 text-muted-foreground">
                  {language === 'EN' 
                    ? 'Join investors creating environmental impact while earning sustainable returns through regenerative agave cultivation.'
                    : 'Únete a inversionistas creando impacto ambiental mientras obtienen retornos sostenibles a través del cultivo regenerativo de agave.'
                  }
                </p>
                <InvestmentModal>
                  <Button size="lg" className="bg-gave-yellow hover:bg-gave-yellow/90 text-gray-900 font-semibold">
                    {language === 'EN' ? 'Get Started' : 'Comenzar'}
                  </Button>
                </InvestmentModal>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
