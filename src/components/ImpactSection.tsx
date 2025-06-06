
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ImpactSection = () => {
  const impactAreas = [
    {
      title: 'Biodiversity Conservation',
      titleES: 'Conservación de Biodiversidad',
      description: 'Our tech-focused approach to wild agave cultivation preserves natural ecosystems and protects endangered agave species through monitoring and sustainable harvesting methods.',
      descriptionES: 'Nuestro enfoque tecnológico en el cultivo de agave silvestre preserva ecosistemas naturales y protege especies de agave en peligro mediante monitoreo y métodos de cosecha sustentables.',
      metric: '15+ Species Protected',
      metricES: '15+ Especies Protegidas',
      icon: '🌿'
    },
    {
      title: 'Land Regeneration',
      titleES: 'Regeneración de Tierras',
      description: 'Our operations focus on land regeneration through agrosilvopastoral models that restore degraded soil and increase biodiversity.',
      descriptionES: 'Nuestras operaciones se enfocan en la regeneración de tierras a través de modelos agrosilvopastorales que restauran suelos degradados y aumentan la biodiversidad.',
      metric: '2,450 Hectares Restored',
      metricES: '2,450 Hectáreas Restauradas',
      icon: '🌱'
    },
    {
      title: 'Carbon Sequestration',
      titleES: 'Captura de Carbono',
      description: 'Agave plants and our regenerative practices sequester significant amounts of carbon, contributing to climate change mitigation.',
      descriptionES: 'Las plantas de agave y nuestras prácticas regenerativas capturan cantidades significativas de carbono, contribuyendo a la mitigación del cambio climático.',
      metric: '15,670 Tons CO₂ Captured',
      metricES: '15,670 Toneladas CO₂ Capturadas',
      icon: '🌍'
    },
    {
      title: 'Community Impact',
      titleES: 'Impacto Comunitario',
      description: 'We provide sustainable employment and training to local communities in San Luis Potosí, México, creating lasting social impact.',
      descriptionES: 'Proporcionamos empleo sustentable y capacitación a comunidades locales en San Luis Potosí, México, creando un impacto social duradero.',
      metric: '1,200 Families Supported',
      metricES: '1,200 Familias Apoyadas',
      icon: '🤝'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Measurable Impact, Profitable Returns
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every investment creates positive environmental and social impact while delivering profitable financial returns through our technology-driven approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="text-4xl mb-3">{area.icon}</div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">{area.metric}</div>
                <CardDescription className="text-sm">
                  {area.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology & Returns Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Technology-Driven Sustainability</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Data Analytics & Monitoring</h4>
                  <p className="text-muted-foreground">Real-time monitoring of plant health, soil conditions, and growth patterns using satellite imagery and drone technology.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Predictive Modeling</h4>
                  <p className="text-muted-foreground">AI-powered models predict optimal harvest times and market conditions to maximize returns.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Risk Management</h4>
                  <p className="text-muted-foreground">Comprehensive insurance and plant replacement guarantees minimize investment risk.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-impact rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Profitable Returns</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Expected Annual Return</span>
                  <span className="text-2xl font-bold">18-25%</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Investment Period</span>
                  <span className="text-2xl font-bold">5-9 Years</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">
                  Returns are shared 65% to investors, 35% to Gavé for crop management and harvest sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
