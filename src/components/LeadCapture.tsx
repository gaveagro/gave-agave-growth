
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const LeadCapture = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'EN';
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentAmount: '',
    investmentModel: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      title: 'Start Your Agave Investment',
      subtitle: 'Get personalized investment recommendations and access to our exclusive opportunities.',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      investmentAmount: 'Investment Amount (USD)',
      investmentModel: 'Preferred Model',
      message: 'Additional Message',
      selectModel: 'Select a model',
      espadinModel: 'Espadín (5-6 years)',
      salmianaModel: 'Salmiana (7-9 years)',
      submitButton: 'Submit Investment Interest',
      thankYou: 'Thank You!',
      thankYouMessage: 'We\'ve received your investment interest. Our team will contact you within 24 hours with personalized recommendations.',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email address',
      phonePlaceholder: 'Enter your phone number',
      messagePlaceholder: 'Tell us about your investment goals...'
    },
    ES: {
      title: 'Comienza tu Inversión en Agave',
      subtitle: 'Obtén recomendaciones de inversión personalizadas y acceso a nuestras oportunidades exclusivas.',
      name: 'Nombre Completo',
      email: 'Dirección de Correo',
      phone: 'Número de Teléfono',
      investmentAmount: 'Monto de Inversión (USD)',
      investmentModel: 'Modelo Preferido',
      message: 'Mensaje Adicional',
      selectModel: 'Selecciona un modelo',
      espadinModel: 'Espadín (5-6 años)',
      salmianaModel: 'Salmiana (7-9 años)',
      submitButton: 'Enviar Interés de Inversión',
      thankYou: '¡Gracias!',
      thankYouMessage: 'Hemos recibido tu interés de inversión. Nuestro equipo se pondrá en contacto contigo en 24 horas con recomendaciones personalizadas.',
      namePlaceholder: 'Ingresa tu nombre completo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      messagePlaceholder: 'Cuéntanos sobre tus objetivos de inversión...'
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead captured:', formData);
    setIsSubmitted(true);
    // Here you would integrate with your lead capture system
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{currentContent.thankYou}</h3>
            <p className="text-muted-foreground">{currentContent.thankYouMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{currentContent.title}</CardTitle>
        <p className="text-center text-muted-foreground">{currentContent.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.name}</label>
              <Input
                required
                placeholder={currentContent.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.email}</label>
              <Input
                type="email"
                required
                placeholder={currentContent.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.phone}</label>
              <Input
                type="tel"
                placeholder={currentContent.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.investmentAmount}</label>
              <Input
                type="number"
                min="1000"
                step="1000"
                placeholder="$10,000"
                value={formData.investmentAmount}
                onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{currentContent.investmentModel}</label>
            <Select value={formData.investmentModel} onValueChange={(value) => handleInputChange('investmentModel', value)}>
              <SelectTrigger>
                <SelectValue placeholder={currentContent.selectModel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="espadín">{currentContent.espadinModel}</SelectItem>
                <SelectItem value="salmiana">{currentContent.salmianaModel}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{currentContent.message}</label>
            <Textarea
              placeholder={currentContent.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
            {currentContent.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCapture;
