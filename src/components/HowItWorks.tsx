
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Investment',
      description: 'Select agave plants from our established fields in San Luis Potosí. Choose between intensive agriculture or regenerative agrosilvopastoral models.',
      details: ['Agave Angustifolia Haw (Espadín)', 'Agave Salmiana', 'Price includes all costs and guarantees']
    },
    {
      step: '02',
      title: 'We Manage Everything',
      description: 'Gavé handles all aspects of cultivation including labor, land lease, insurance, fertilization, pest control, and plant replacement guarantees.',
      details: ['Professional crop management', 'Insurance coverage', 'Plant replacement guarantee', 'Regular monitoring reports']
    },
    {
      step: '03',
      title: 'Monitor Your Investment',
      description: 'Track your plants\' growth and health through our technology platform with real-time data and regular updates.',
      details: ['IoT sensor monitoring', 'Satellite imagery', 'Growth progress reports', 'Environmental impact metrics']
    },
    {
      step: '04',
      title: 'Harvest & Returns',
      description: 'After 8-12 years, we harvest and sell to the highest bidder. You receive 65% of the profit margin above production costs.',
      details: ['Optimal harvest timing', 'Best market price', '65% profit share', 'Transparent reporting']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Sustainable Agave Investment Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, transparent process that delivers both environmental impact and financial returns through our proven methodology.
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
              </div>
              
              <Card className="flex-1 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Investment Models Comparison */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Choose Your Impact Model</h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Intensive Agriculture</CardTitle>
                <CardDescription>Traditional monocrop approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">18-20%</div>
                  <div className="text-sm text-muted-foreground">Expected Returns</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Higher plant density</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Faster harvest cycles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Predictable yields</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader className="text-center">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                  RECOMMENDED
                </div>
                <CardTitle className="text-xl">Agrosilvopastoral Model</CardTitle>
                <CardDescription>Regenerative agriculture approach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">22-25%</div>
                  <div className="text-sm text-muted-foreground">Expected Returns</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Maximum biodiversity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Enhanced carbon sequestration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Soil regeneration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Higher market premium</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Your Investment Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
