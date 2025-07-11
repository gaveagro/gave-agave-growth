
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useContent';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = useBlogPosts();
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
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed space-y-6">
                {(language === 'EN' ? post.body_en : post.body_es).split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground">
                    {paragraph}
                  </p>
                ))}
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
