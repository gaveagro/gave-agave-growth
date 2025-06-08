
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const blogPosts = {
    '1': {
      title: "The Future of Sustainable Agriculture: Why Agave is Leading the Way",
      titleES: "El Futuro de la Agricultura Sustentable: Por qué el Agave Lidera el Camino",
      excerpt: "Discover how agave cultivation is revolutionizing sustainable agriculture while providing exceptional returns for investors.",
      excerptES: "Descubre cómo el cultivo de agave está revolucionando la agricultura sustentable mientras proporciona retornos excepcionales para los inversionistas.",
      content: `Agave cultivation represents a paradigm shift in sustainable agriculture, offering unprecedented opportunities for environmental restoration while delivering solid financial returns. This drought-resistant succulent is proving to be the cornerstone of regenerative farming practices across México.

The global demand for agave-based products has surged dramatically, driven by the growing popularity of premium spirits and the emerging biofuel industry. Unlike traditional crops that deplete soil nutrients and require intensive irrigation, agave plants actually improve soil health while requiring minimal water resources.

Our research shows that agave cultivation can sequester up to 15 tons of CO₂ per hectare annually, making it one of the most effective carbon capture crops available. The deep root systems of agave plants prevent soil erosion and create microhabitats for native flora and fauna.

Investment opportunities in agave are particularly attractive due to the crop's resilience and the expanding market demand. With maturation periods ranging from 5-9 years depending on the species, investors can expect substantial returns while contributing to environmental restoration efforts.`,
      contentES: `El cultivo de agave representa un cambio de paradigma en la agricultura sustentable, ofreciendo oportunidades sin precedentes para la restauración ambiental mientras entrega retornos financieros sólidos. Esta suculenta resistente a la sequía está demostrando ser la piedra angular de las prácticas agrícolas regenerativas en México.

La demanda global de productos basados en agave ha aumentado dramáticamente, impulsada por la creciente popularidad de los destilados premium y la industria emergente de biocombustibles. A diferencia de los cultivos tradicionales que agotan los nutrientes del suelo y requieren riego intensivo, las plantas de agave en realidad mejoran la salud del suelo mientras requieren recursos hídricos mínimos.

Nuestra investigación muestra que el cultivo de agave puede secuestrar hasta 15 toneladas de CO₂ por hectárea anualmente, convirtiéndolo en uno de los cultivos de captura de carbono más efectivos disponibles. Los sistemas de raíces profundas de las plantas de agave previenen la erosión del suelo y crean microhábitats para flora y fauna nativas.

Las oportunidades de inversión en agave son particularmente atractivas debido a la resistencia del cultivo y la expansión de la demanda del mercado. Con períodos de maduración que van de 5-9 años dependiendo de la especie, los inversionistas pueden esperar retornos sustanciales mientras contribuyen a los esfuerzos de restauración ambiental.`,
      author: "Gavé Research Team",
      authorES: "Equipo de Investigación Gavé",
      date: "2024-03-15",
      category: "Research",
      categoryES: "Investigación",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=600&fit=crop&crop=center",
      readTime: "8 min read",
      readTimeES: "8 min de lectura"
    },
    '2': {
      title: "Carbon Sequestration in Agave: Measuring Our Environmental Impact",
      titleES: "Captura de Carbono en Agave: Midiendo Nuestro Impacto Ambiental",
      excerpt: "Learn about our latest findings on carbon sequestration rates in our agave plantations and their contribution to climate action.",
      excerptES: "Conoce nuestros últimos hallazgos sobre las tasas de captura de carbono en nuestras plantaciones de agave y su contribución a la acción climática.",
      content: `Our comprehensive study on carbon sequestration in agave plantations has yielded remarkable results that position agave cultivation as a leading solution for climate change mitigation. Over three years of intensive monitoring across our San Luis Potosí facilities, we've documented unprecedented carbon capture rates.

The study encompassed 260 hectares of diverse agave cultivation, including both monocrop and agrosilvopastoral models. Using advanced soil sampling techniques and satellite imagery analysis, we measured carbon sequestration rates of 12-18 tons of CO₂ per hectare annually, significantly higher than traditional agriculture.

Key findings include: Enhanced soil organic carbon content increased by 45% over three years, with the agrosilvopastoral model showing superior performance. The integration of native tree species like mezquite alongside agave created synergistic effects, boosting overall ecosystem carbon storage.

Our data indicates that scaling agave cultivation across degraded lands in México could sequester millions of tons of atmospheric carbon while generating substantial economic value for local communities and investors.`,
      contentES: `Nuestro estudio integral sobre captura de carbono en plantaciones de agave ha arrojado resultados notables que posicionan el cultivo de agave como una solución líder para la mitigación del cambio climático. Durante tres años de monitoreo intensivo en nuestras instalaciones de San Luis Potosí, hemos documentado tasas de captura de carbono sin precedentes.

El estudio abarcó 260 hectáreas de cultivo diverso de agave, incluyendo tanto modelos de monocultivo como agrosilvopastorales. Utilizando técnicas avanzadas de muestreo de suelo y análisis de imágenes satelitales, medimos tasas de captura de carbono de 12-18 toneladas de CO₂ por hectárea anualmente, significativamente más altas que la agricultura tradicional.

Los hallazgos clave incluyen: El contenido de carbono orgánico del suelo mejoró en un 45% durante tres años, con el modelo agrosilvopastoril mostrando rendimiento superior. La integración de especies nativas de árboles como el mezquite junto con el agave creó efectos sinérgicos, impulsando el almacenamiento total de carbono del ecosistema.

Nuestros datos indican que escalar el cultivo de agave en tierras degradadas en México podría secuestrar millones de toneladas de carbono atmosférico mientras genera valor económico sustancial para comunidades locales e inversionistas.`,
      author: "Dr. María González",
      authorES: "Dra. María González",
      date: "2024-03-10",
      category: "Impact Report",
      categoryES: "Reporte de Impacto",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop&crop=center",
      readTime: "12 min read",
      readTimeES: "12 min de lectura"
    },
    '3': {
      title: "Community Development in San Luis Potosí: 5 Years of Progress",
      titleES: "Desarrollo Comunitario en San Luis Potosí: 5 Años de Progreso",
      excerpt: "A comprehensive look at how our operations have transformed local communities through sustainable employment and training programs.",
      excerptES: "Una mirada integral a cómo nuestras operaciones han transformado las comunidades locales a través de empleo sustentable y programas de capacitación.",
      content: `Five years ago, we embarked on a mission to create sustainable economic opportunities in rural San Luis Potosí while restoring degraded agricultural lands. Today, we celebrate remarkable achievements in community development that extend far beyond our agave cultivation operations.

Our community impact program has generated over 25,000 workdays for local families, providing stable employment in regions where economic opportunities were previously scarce. We've established comprehensive training programs that have equipped 150 community members with modern agricultural techniques, business skills, and technical knowledge.

The ripple effects of our presence have been profound. Local infrastructure has improved significantly, with new roads connecting remote communities to regional markets. We've partnered with local schools to provide environmental education programs, reaching over 500 students annually.

Our commitment to working exclusively with indigenous land ownership has strengthened traditional governance structures while introducing modern sustainable farming practices. This approach has created a unique model of development that respects cultural heritage while building economic prosperity.

Women's participation in our programs has been particularly successful, with 40% of our training program graduates being women who now lead their own agave cultivation initiatives. These success stories demonstrate the transformative power of sustainable agriculture when implemented with genuine community partnership.`,
      contentES: `Hace cinco años, nos embarcamos en una misión para crear oportunidades económicas sustentables en el San Luis Potosí rural mientras restaurábamos tierras agrícolas degradadas. Hoy, celebramos logros notables en desarrollo comunitario que se extienden mucho más allá de nuestras operaciones de cultivo de agave.

Nuestro programa de impacto comunitario ha generado más de 25,000 jornadas laborales para familias locales, proporcionando empleo estable en regiones donde las oportunidades económicas eran previamente escasas. Hemos establecido programas de capacitación integrales que han equipado a 150 miembros de la comunidad con técnicas agrícolas modernas, habilidades comerciales y conocimiento técnico.

Los efectos multiplicadores de nuestra presencia han sido profundos. La infraestructura local ha mejorado significativamente, con nuevos caminos conectando comunidades remotas a mercados regionales. Nos hemos asociado con escuelas locales para proporcionar programas de educación ambiental, alcanzando más de 500 estudiantes anualmente.

Nuestro compromiso de trabajar exclusivamente con propiedad de tierra indígena ha fortalecido las estructuras de gobierno tradicionales mientras introduce prácticas agrícolas sustentables modernas. Este enfoque ha creado un modelo único de desarrollo que respeta el patrimonio cultural mientras construye prosperidad económica.

La participación de las mujeres en nuestros programas ha sido particularmente exitosa, con el 40% de nuestros graduados del programa de capacitación siendo mujeres que ahora lideran sus propias iniciativas de cultivo de agave. Estas historias de éxito demuestran el poder transformador de la agricultura sustentable cuando se implementa con una verdadera asociación comunitaria.`,
      author: "Carlos Mendoza",
      authorES: "Carlos Mendoza",
      date: "2024-03-05",
      category: "Community",
      categoryES: "Comunidad",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=600&fit=crop&crop=center",
      readTime: "10 min read",
      readTimeES: "10 min de lectura"
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
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
            src={post.image} 
            alt={language === 'EN' ? post.title : post.titleES}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <div className="mb-4">
                <span className="bg-gave-blue px-3 py-1 rounded-full text-sm">
                  {language === 'EN' ? post.category : post.categoryES}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                {language === 'EN' ? post.title : post.titleES}
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {language === 'EN' ? post.excerpt : post.excerptES}
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
                <span>{language === 'EN' ? post.author : post.authorES}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{language === 'EN' ? post.readTime : post.readTimeES}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed space-y-6">
                {(language === 'EN' ? post.content : post.contentES).split('\n\n').map((paragraph, index) => (
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
