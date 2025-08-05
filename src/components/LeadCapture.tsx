import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import NetlifyForm from './NetlifyForm';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase (con fallback por si las variables de entorno no están definidas)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://rwgfcwirvscdyhvqtgtn.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Z2Zjd2lydnNjZHlodnF0Z3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzMxNjAsImV4cCI6MjA1MTM0OTE2MH0.QEa-3G8yg_AE1Ym_CYO6KrHI8U10mWmnw2C0EL0x9nM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función auxiliar para calcular valores de inversión (USD/MXN)
const calculateInvestmentValue = (amount: string, isEnglish: boolean): number => {
  switch (amount) {
    case '200-plants': return isEnglish ? 2500 : 50000;
    case '1-hectare': return isEnglish ? 31250 : 625000;
    default: return 0;
  }
};

const LeadCapture = () => {
  const [language, setLanguage] = useState<'EN' | 'ES'>(() => (window as any).currentLanguage || 'ES');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentAmount: '',
    investmentModel: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pixelTracked = useRef(false); // Para evitar duplicados en el Pixel

  // Efecto para manejar cambio de idioma
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Verificar si hay un idioma predefinido
    const currentLang = (window as any).currentLanguage;
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [language]);

  // Contenido multiidioma
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
      submittingButton: 'Sending...',
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
      investmentAmount: 'Monto de Inversión (MXN)',
      investmentModel: 'Modelo Preferido',
      message: 'Mensaje Adicional',
      selectModel: 'Selecciona un modelo',
      espadinModel: 'Espadín (5-6 años)',
      salmianaModel: 'Salmiana (7-9 años)',
      submitButton: 'Enviar Interés de Inversión',
      submittingButton: 'Enviando...',
      thankYou: '¡Gracias!',
      thankYouMessage: 'Hemos recibido tu interés de inversión. Nuestro equipo se pondrá en contacto contigo en 24 horas con recomendaciones personalizadas.',
      namePlaceholder: 'Ingresa tu nombre completo',
      emailPlaceholder: 'Ingresa tu dirección de correo',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      messagePlaceholder: 'Cuéntanos sobre tus objetivos de inversión...'
    }
  };

  const currentContent = content[language];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Evitar envíos duplicados
    if (isSubmitting) return;
    setIsSubmitting(true);
    pixelTracked.current = false;

    try {
      // 1. Verificar conexión con Supabase
      const isConnected = await testConnection(SUPABASE_URL);
      if (!isConnected) {
        throw new Error('No se pudo conectar con Supabase');
      }

      // 2. Enviar datos a Supabase
      const { error } = await supabase.functions.invoke('form-submission', {
        body: {
          ...formData,
          formType: 'investment-lead-capture'
        }
      });

      if (error) throw error;

      // 3. Disparar evento de Meta Pixel (solo si no se ha enviado antes)
      if (!pixelTracked.current && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Formulario de Inversión',
          content_category: 'Lead Generation',
          value: calculateInvestmentValue(formData.investmentAmount, language === 'EN'),
          currency: language === 'EN' ? 'USD' : 'MXN',
          investment_model: formData.investmentModel,
          email: formData.email, // Para remarketing (opcional)
          phone: formData.phone  // Para remarketing (opcional)
        });
        pixelTracked.current = true;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('❌ Error al enviar el formulario:', error);
      
      // Opcional: Trackear evento fallido
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'LeadError', {
          description: 'Error en envío de formulario'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para probar conexión con Supabase
  const testConnection = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error de conexión:', error);
      return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Vista después de enviar
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

  // Vista principal del formulario
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{currentContent.investmentAmount}</label>
              <Select 
                name="investmentAmount" 
                value={formData.investmentAmount} 
                onValueChange={(value) => handleInputChange('investmentAmount', value)}
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? currentContent.submittingButton : currentContent.submitButton}
          </Button>
        </NetlifyForm>
      </CardContent>
    </Card>
  );
};

export default LeadCapture;
