import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
const Testimonials = () => {
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
      title: 'What Our Investors Say',
      subtitle: 'Join hundreds of investors who are already growing sustainable returns with Gavé.',
      recognizedBy: 'Recognized and supported by leading organizations'
    },
    ES: {
      title: 'Lo Que Dicen Nuestros Inversionistas',
      subtitle: 'Únete a cientos de inversionistas que ya están generando retornos sustentables con Gavé.',
      recognizedBy: 'Reconocidos y respaldados por organizaciones líderes'
    }
  };
  const testimonials = {
    EN: [{
      name: "María González",
      role: "Individual Investor",
      location: "Mexico City, MX",
      quote: "Gavé's transparency and technology-driven approach gave me confidence to invest in sustainable agriculture. The regular updates and environmental impact reports show real results.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face"
    }, {
      name: "David Chen",
      role: "ESG Portfolio Manager",
      location: "Sydney, AU",
      quote: "As an institutional investor, we value Gavé's measurable impact metrics and superior returns. Their agrosilvopastoral model aligns perfectly with our sustainability goals.",
      avatar: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=60&h=60&fit=crop&crop=face"
    }, {
      name: "Ana Rodriguez",
      role: "Impact Investor",
      location: "Barcelona, ES",
      quote: "The combination of financial returns and environmental regeneration makes this investment unique. Seeing the community impact in San Luis Potosí has been incredibly rewarding.",
      avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=60&h=60&fit=crop&crop=face"
    }],
    ES: [{
      name: "María González",
      role: "Inversionista Individual",
      location: "Ciudad de México, MX",
      quote: "La transparencia de Gavé y su enfoque impulsado por tecnología me dieron confianza para invertir en agricultura sustentable. Las actualizaciones regulares y reportes de impacto ambiental muestran resultados reales.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=60&h=60&fit=crop&crop=face"
    }, {
      name: "David Chen",
      role: "Gerente de Portafolio ESG",
      location: "Sídney, AU",
      quote: "Como inversionista institucional, valoramos las métricas de impacto medibles de Gavé y sus retornos superiores. Su modelo agrosilvopastoril se alinea perfectamente con nuestros objetivos de sustentabilidad.",
      avatar: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=60&h=60&fit=crop&crop=face"
    }, {
      name: "Ana Rodríguez",
      role: "Inversionista de Impacto",
      location: "Barcelona, ES",
      quote: "La combinación de retornos financieros y regeneración ambiental hace que esta inversión sea única. Ver el impacto comunitario en San Luis Potosí ha sido increíblemente gratificante.",
      avatar: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=60&h=60&fit=crop&crop=face"
    }]
  };
  const currentContent = content[language as keyof typeof content];
  const currentTestimonials = testimonials[language as keyof typeof testimonials];
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentTestimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex text-yellow-400 mt-4">
                  {'★'.repeat(5)}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Trust Indicators with Logos */}
        
      </div>
    </section>;
};
export default Testimonials;