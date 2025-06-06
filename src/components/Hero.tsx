
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', email);
    setIsSubmitted(true);
    // Here you would integrate with your lead capture system
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90"></div>
      
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop&crop=center")'
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Invest in
                <span className="block text-yellow-300">Sustainable Agave</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Technology-driven cultivation delivering superior returns while regenerating land and supporting communities in México.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                🌱 Carbon Sequestration
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                📈 Superior Returns
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                🤝 Community Impact
              </div>
            </div>

            {/* Lead Capture Form */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Start Your Sustainable Investment Journey
              </h3>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-600"
                    />
                    <Button 
                      type="submit" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8"
                    >
                      Get Started
                    </Button>
                  </div>
                  <p className="text-xs text-white/70">
                    Join 500+ investors already growing sustainable returns
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Thank you!</h4>
                  <p className="text-white/80">We'll be in touch with investment opportunities soon.</p>
                </div>
              )}
            </Card>

            {/* Trust Indicators */}
            <div className="space-y-3">
              <p className="text-white/80 text-sm">Trusted by:</p>
              <div className="flex flex-wrap items-center gap-6 opacity-80">
                <span className="text-white/70 text-sm">Startupbootcamp Australia</span>
                <span className="text-white/70 text-sm">FLII</span>
                <span className="text-white/70 text-sm">Alterna Accelerator</span>
              </div>
            </div>
          </div>

          {/* Right Column - Impact Stats */}
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <div className="text-3xl font-bold text-yellow-300 animate-counter-up">2,450</div>
                <div className="text-sm opacity-80">Hectares Reforested</div>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <div className="text-3xl font-bold text-yellow-300 animate-counter-up">15,670</div>
                <div className="text-sm opacity-80">Tons CO₂ Sequestered</div>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <div className="text-3xl font-bold text-yellow-300 animate-counter-up">1,200</div>
                <div className="text-sm opacity-80">Families Supported</div>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <div className="text-3xl font-bold text-yellow-300 animate-counter-up">23%</div>
                <div className="text-sm opacity-80">Average Returns</div>
              </Card>
            </div>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <h3 className="text-lg font-semibold mb-3">Why Agave?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span>Drought-resistant crop requiring minimal water</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span>8-12 year growth cycle with predictable returns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span>Growing demand in spirits and biofuel industries</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
