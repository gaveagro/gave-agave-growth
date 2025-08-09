
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InvestmentModal from '@/components/InvestmentModal';
import { useBlogPosts } from '@/hooks/useContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
            <div className="max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-foreground" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-foreground leading-relaxed mb-4" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4 text-foreground" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 text-foreground" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  a: ({ node, ...props }) => (
                    <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-foreground" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-border" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-border px-4 py-2 font-semibold text-left bg-muted" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-border px-4 py-2" {...props} />
                  ),
                }}
              >
                {language === 'EN' ? post.body_en : post.body_es}
              </ReactMarkdown>
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
