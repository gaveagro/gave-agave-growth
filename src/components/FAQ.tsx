
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
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
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about sustainable agave investment with Gavé.',
      stillHaveQuestions: 'Still have questions? We\'re here to help.',
      contactTeam: 'Contact Our Investment Team →'
    },
    ES: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre inversión sustentable en agave con Gavé.',
      stillHaveQuestions: '¿Aún tienes preguntas? Estamos aquí para ayudarte.',
      contactTeam: 'Contacta a Nuestro Equipo de Inversión →'
    }
  };

  const faqs = {
    EN: [
      {
        question: "What is agave investment and how does it work?",
        answer: "Agave investment involves purchasing agave plants that Gavé has established in our fields in San Luis Potosí, México. The price covers all production costs including labor, land lease, insurance, fertilization, and pest control. After 8-12 years, we harvest and sell the agave, sharing 65% of the profit with you."
      },
      {
        question: "What types of agave do you cultivate?",
        answer: "We primarily cultivate Agave Angustifolia Haw (Espadín) and Agave Salmiana. These varieties are well-suited to our climate and have strong market demand in the spirits and biofuel industries."
      },
      {
        question: "What are the expected returns and investment period?",
        answer: "Expected returns range from 18-25% annually depending on the cultivation model chosen. The investment period is typically 8-12 years, allowing the agave to reach full maturity for optimal market value."
      },
      {
        question: "How do you ensure my investment is protected?",
        answer: "We provide comprehensive insurance coverage and plant replacement guarantees. If any plant fails, Gavé replaces it with another plant of the same age at no additional cost. Our technology monitoring systems also help prevent losses through early detection of issues."
      },
      {
        question: "What's the difference between intensive agriculture and agrosilvopastoral models?",
        answer: "Intensive agriculture uses traditional monocrop methods with higher plant density and predictable yields (18-20% returns). The agrosilvopastoral model uses regenerative agriculture practices that enhance biodiversity and carbon sequestration while delivering higher returns (22-25%)."
      },
      {
        question: "How can I monitor my investment?",
        answer: "You'll have access to our monitoring platform at dashboard.gaveagro.com where you can track plant growth, health metrics, environmental impact, and receive regular progress reports with IoT sensor data and satellite imagery."
      },
      {
        question: "Who buys the harvested agave and at what price?",
        answer: "At harvest time, we sell to the highest bidder in the market, which typically includes spirits distilleries, biofuel companies, and other agave product manufacturers. The final selling price depends on market conditions and agave quality."
      },
      {
        question: "What environmental impact does my investment create?",
        answer: "Your investment contributes to carbon sequestration, land regeneration, biodiversity conservation, and community support. On average, each investment helps sequester CO₂, restore degraded land, and provide sustainable employment for local families."
      },
      {
        question: "How do I get started with agave investment?",
        answer: "Simply contact us through our website or monitoring platform. We'll guide you through the investment options, help you choose between cultivation models, and handle all the documentation and setup for your agave investment."
      },
      {
        question: "Is this investment suitable for institutional investors?",
        answer: "Yes, we work with both individual and institutional investors. Our technology-driven approach, transparent reporting, and measurable impact metrics make agave investment suitable for ESG-focused institutional portfolios."
      }
    ],
    ES: [
      {
        question: "¿Qué es la inversión en agave y cómo funciona?",
        answer: "La inversión en agave implica comprar plantas de agave que Gavé ha establecido en nuestros campos en San Luis Potosí, México. El precio cubre todos los costos de producción incluyendo mano de obra, arrendamiento de tierra, seguro, fertilización y control de plagas. Después de 8-12 años, cosechamos y vendemos el agave, compartiendo el 65% de la ganancia contigo."
      },
      {
        question: "¿Qué tipos de agave cultivan?",
        answer: "Cultivamos principalmente Agave Angustifolia Haw (Espadín) y Agave Salmiana. Estas variedades están bien adaptadas a nuestro clima y tienen una fuerte demanda de mercado en las industrias de destilados y biocombustibles."
      },
      {
        question: "¿Cuáles son los retornos esperados y el período de inversión?",
        answer: "Los retornos esperados oscilan entre 18-25% anual dependiendo del modelo de cultivo elegido. El período de inversión es típicamente de 8-12 años, permitiendo que el agave alcance la madurez completa para un valor de mercado óptimo."
      },
      {
        question: "¿Cómo aseguran que mi inversión esté protegida?",
        answer: "Proporcionamos cobertura de seguro integral y garantías de reemplazo de plantas. Si alguna planta falla, Gavé la reemplaza con otra planta de la misma edad sin costo adicional. Nuestros sistemas de monitoreo tecnológico también ayudan a prevenir pérdidas mediante detección temprana de problemas."
      },
      {
        question: "¿Cuál es la diferencia entre agricultura intensiva y modelos agrosilvopastoriles?",
        answer: "La agricultura intensiva usa métodos tradicionales de monocultivo con mayor densidad de plantas y rendimientos predecibles (retornos del 18-20%). El modelo agrosilvopastoril usa prácticas de agricultura regenerativa que mejoran la biodiversidad y captura de carbono mientras entregan mayores retornos (22-25%)."
      },
      {
        question: "¿Cómo puedo monitorear mi inversión?",
        answer: "Tendrás acceso a nuestra plataforma de monitoreo en dashboard.gaveagro.com donde puedes rastrear el crecimiento de las plantas, métricas de salud, impacto ambiental, y recibir reportes regulares de progreso con datos de sensores IoT e imágenes satelitales."
      },
      {
        question: "¿Quién compra el agave cosechado y a qué precio?",
        answer: "Al momento de la cosecha, vendemos al mejor postor en el mercado, que típicamente incluye destilerías de bebidas espirituosas, compañías de biocombustibles y otros fabricantes de productos de agave. El precio final de venta depende de las condiciones del mercado y la calidad del agave."
      },
      {
        question: "¿Qué impacto ambiental crea mi inversión?",
        answer: "Tu inversión contribuye a la captura de carbono, regeneración de tierras, conservación de biodiversidad y apoyo comunitario. En promedio, cada inversión ayuda a capturar CO₂, restaurar tierras degradadas y proporcionar empleo sustentable para familias locales."
      },
      {
        question: "¿Cómo empiezo con la inversión en agave?",
        answer: "Simplemente contáctanos a través de nuestro sitio web o plataforma de monitoreo. Te guiaremos a través de las opciones de inversión, te ayudaremos a elegir entre modelos de cultivo, y manejaremos toda la documentación y configuración para tu inversión en agave."
      },
      {
        question: "¿Es esta inversión adecuada para inversionistas institucionales?",
        answer: "Sí, trabajamos tanto con inversionistas individuales como institucionales. Nuestro enfoque impulsado por tecnología, reportes transparentes y métricas de impacto medibles hacen que la inversión en agave sea adecuada para portafolios institucionales enfocados en ESG."
      }
    ]
  };

  const currentContent = content[language as keyof typeof content];
  const currentFaqs = faqs[language as keyof typeof faqs];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {currentFaqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {currentContent.stillHaveQuestions}
          </p>
          <button className="text-primary hover:text-primary/80 font-semibold">
            {currentContent.contactTeam}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
