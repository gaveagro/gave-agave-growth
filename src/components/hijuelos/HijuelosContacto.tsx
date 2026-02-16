import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@supabase/supabase-js';
import { trackFormSubmission } from '@/lib/analytics';

const SUPABASE_URL = 'https://ybhbceqthsfgsjccounm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaGJjZXF0aHNmZ3NqY2NvdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDM2NzgsImV4cCI6MjA2NDgxOTY3OH0.e-mHzlSFVzx6dCgMwMY-ynFw0l9yrbXYXdr1n1Uoh_M';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const HijuelosContacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    numPlantas: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load reCAPTCHA
  useEffect(() => {
    if (window.grecaptcha) return;
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LdJt5srAAAAAD7ZoZQ54TcJAeH_ZlgjK7Tg82ft';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const generateRecaptchaToken = async (): Promise<string | null> => {
    if (!window.grecaptcha) return null;
    try {
      return await window.grecaptcha.enterprise.execute('6LdJt5srAAAAAD7ZoZQ54TcJAeH_ZlgjK7Tg82ft', { action: 'form_submit' });
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await generateRecaptchaToken();
      if (!token) {
        alert('Error de validación reCAPTCHA. Inténtalo de nuevo.');
        return;
      }

      const { error } = await supabase.functions.invoke('form-submission', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Región: ${formData.region}\nPlantas estimadas: ${formData.numPlantas}\n\n${formData.message}`,
          formType: 'hijuelos-espadin-lead',
          recaptchaToken: token
        }
      });

      if (error) throw error;
      trackFormSubmission('hijuelos-espadin-lead', true);

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Hijuelos Espadín',
          content_category: 'Hijuelos Lead',
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      trackFormSubmission('hijuelos-espadin-lead', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">¡Gracias por tu interés!</h3>
              <p className="text-muted-foreground">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Solicita tu Cotización
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cuéntanos sobre tu proyecto y te enviaremos una propuesta personalizada.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                  <Input
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="Ej. 444 123 4567"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Correo electrónico *</label>
                <Input
                  required
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Región / Municipio</label>
                  <Select value={formData.region} onValueChange={v => handleChange('region', v)} disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu región" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="huasteca-potosina">Huasteca Potosina</SelectItem>
                      <SelectItem value="tamaulipas">Tamaulipas (DO Mezcal)</SelectItem>
                      <SelectItem value="aguascalientes">Aguascalientes</SelectItem>
                      <SelectItem value="guanajuato">Guanajuato</SelectItem>
                      <SelectItem value="otra">Otra región</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Plantas estimadas</label>
                  <Input
                    type="number"
                    placeholder="Ej. 2400"
                    value={formData.numPlantas}
                    onChange={e => handleChange('numPlantas', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensaje adicional</label>
                <Textarea
                  placeholder="Cuéntanos más sobre tu proyecto..."
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  className="min-h-[100px]"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HijuelosContacto;
