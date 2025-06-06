
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
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
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about sustainable agave investment with Gavé Agro.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
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
            Still have questions? We're here to help.
          </p>
          <button className="text-primary hover:text-primary/80 font-semibold">
            Contact Our Investment Team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
