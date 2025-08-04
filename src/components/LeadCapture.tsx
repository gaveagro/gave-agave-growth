import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import NetlifyForm from './NetlifyForm';
import { enviarNotificacionRegistro } from '@/lib/notifications'; // ← Importar función

const LeadCapture = () => {
  const [language, setLanguage] = useState(() => {
    return (window as any).currentLanguage || 'ES';
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
  const [isSubmitting, setIsSubmitting] = useState(false); // ← Nuevo estado

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
      submittingButton: 'Sending...', // ← Nuevo
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
      submittingButton: 'Enviando...', // ← Nuevo
      thankYou: '¡Gracias!',
      thankYouMessage: 'Hemos recibido tu interés de inversión. Nuestro equipo se pondrá en contacto contigo en 24 horas con recomendaciones personalizadas.',
      namePlaceholder: 'Ingresa tu nombre completo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      messagePlaceholder: 'Cuéntanos sobre tus objetivos de inversión...'
    }
  };

  const currentContent = content[language as keyof typeof content];

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('📝 Lead captured:', formData);
      
      // Call Supabase edge function for form submission and email notification
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        'https://rwgfcwirvscdyhvqtgtn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z2Zjd2lydnNjZHlodnF0Z3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzMxNjAsImV4cCI6MjA1MTM0OTE2MH0.QEa-3G8yg_AE1Ym_CYO6KrHI8U10mWmnw2C0EL0x9nM'
      );
      
      const { data, error } = await supabase.functions.invoke('form-submission', {
        body: {
          ...formData,
          formType: 'investment-lead-capture'
        }
      });
      
      if (error) {
        console.error('Error submitting form:', error);
      } else {
        console.log('✅ Form submitted successfully:', data);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('❌ Error in form submission:', error);
      // Still show success message to user
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
        <NetlifyForm formName="investment-lead-capture" onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.name}</label>
              <Input
                name="name"
                required
                placeholder={currentContent.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={isSubmitting} // ← Deshabilitar durante envío
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.email}</label>
              <Input
                name="email"
                type="email"
                required
                placeholder={currentContent.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting} // ← Deshabilitar durante envío
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.phone}</label>
              <Input
                name="phone"
                type="tel"
                placeholder={currentContent.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={isSubmitting} // ← Deshabilitar durante envío
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.investmentAmount}</label>
              <Select 
                name="investmentAmount" 
                value={formData.investmentAmount} 
                onValueChange={(value) => handleInputChange('investmentAmount', value)}
                disabled={isSubmitting} // ← Deshabilitar durante envío
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === 'EN' ? 'Select amount' : 'Selecciona monto'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200-plants">{language === 'EN' ? '200 plants: $2,500 USD' : '200 plantas: $50,000 MXN'}</SelectItem>
                  <SelectItem value="1-hectare">{language === 'EN' ? '1 hectare: $31,250 USD' : '1 hectárea: $625,000 MXN'}</SelectItem>
                  <SelectItem value="custom">{language === 'EN' ? 'Custom' : 'A la medida'}</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="investmentAmount" value={formData.investmentAmount} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{currentContent.investmentModel}</label>
            <Select 
              name="investmentModel" 
              value={formData.investmentModel} 
              onValueChange={(value) => handleInputChange('investmentModel', value)}
              disabled={isSubmitting} // ← Deshabilitar durante envío
            >
              <SelectTrigger>
                <SelectValue placeholder={currentContent.selectModel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="espadín">{currentContent.espadinModel}</SelectItem>
                <SelectItem value="salmiana">{currentContent.salmianaModel}</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="investmentModel" value={formData.investmentModel} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{currentContent.message}</label>
            <Textarea
              name="message"
              placeholder={currentContent.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="min-h-[100px]"
              disabled={isSubmitting} // ← Deshabilitar durante envío
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90" 
            size="lg"
            disabled={isSubmitting} // ← Deshabilitar durante envío
          >
            {isSubmitting ? currentContent.submittingButton : currentContent.submitButton}
          </Button>
        </NetlifyForm>
      </CardContent>
    </Card>
  );
};

export default LeadCapture;
