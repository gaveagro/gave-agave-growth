import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NetlifyForm from '@/components/NetlifyForm';
import { getSupabase } from '@/integrations/supabase/lazy';
import { trackFormSubmission } from '@/lib/analytics';
import { useLanguage } from '@/hooks/useLanguage';

const RECAPTCHA_SITE_KEY = '6LdJt5srAAAAAD7ZoZQ54TcJAeH_ZlgjK7Tg82ft';

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

const ContactForm = () => {
  const language = useLanguage();
  const en = language === 'EN';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitting = useRef(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profile: '',
    message: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined' || window.grecaptcha) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getToken = async (): Promise<string | null> => {
    try {
      if (!window.grecaptcha?.enterprise) return null;
      return await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: 'contact_submit' });
    } catch {
      return null;
    }
  };

  const c = en
    ? {
        name: 'Full name',
        email: 'Email',
        phone: 'Phone (optional)',
        profile: 'What describes you best?',
        profilePlaceholder: 'Choose one',
        profiles: [
          'Impact fund / investor',
          'NGO or foundation',
          'Government / public programme',
          'Company looking to offset',
          'Ranch or land owner',
          'Agave producer / nursery buyer',
          'Press or academia',
          'Other',
        ],
        message: 'What do you need?',
        messagePlaceholder: 'Tell us where you stand: land, budget, mandate, timeline…',
        submit: 'Send message',
        sending: 'Sending…',
        thanks: 'Thank you.',
        thanksBody: 'We received your message and will get back to you at the email you provided.',
        error: 'We could not send your message. Please try again or write to hola@gaveagro.com.',
      }
    : {
        name: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Teléfono (opcional)',
        profile: '¿Qué te describe mejor?',
        profilePlaceholder: 'Elige una opción',
        profiles: [
          'Fondo de impacto / inversionista',
          'ONG o fundación',
          'Gobierno / programa público',
          'Empresa que busca compensar',
          'Dueño de rancho o tierra',
          'Productor de agave / comprador de vivero',
          'Prensa o academia',
          'Otro',
        ],
        message: '¿Qué necesitas?',
        messagePlaceholder: 'Cuéntanos dónde estás: tierra, presupuesto, mandato, tiempos…',
        submit: 'Enviar mensaje',
        sending: 'Enviando…',
        thanks: 'Gracias.',
        thanksBody: 'Recibimos tu mensaje y te responderemos al correo que nos dejaste.',
        error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a hola@gaveagro.com.',
      };

  const handleSubmit = async () => {
    if (submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      const supabase = await getSupabase();
      const { error: fnError } = await supabase.functions.invoke('form-submission', {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          investmentModel: form.profile || null,
          message: form.message || null,
          formType: 'contact-general',
          recaptchaToken: token,
        },
      });
      if (fnError) throw fnError;
      trackFormSubmission('contact-general', true);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      trackFormSubmission('contact-general', false);
      setError(c.error);
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-border bg-paper-deep p-10">
        <h3 className="display-md text-ink">{c.thanks}</h3>
        <p className="mt-4 text-muted-foreground">{c.thanksBody}</p>
      </div>
    );
  }

  return (
    <NetlifyForm formName="contact-general" className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            {c.name}
          </label>
          <Input
            id="contact-name"
            required
            maxLength={200}
            className="mt-2 rounded-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            {c.email}
          </label>
          <Input
            id="contact-email"
            type="email"
            required
            maxLength={255}
            className="mt-2 rounded-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-ink">
            {c.phone}
          </label>
          <Input
            id="contact-phone"
            maxLength={50}
            className="mt-2 rounded-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <span className="text-sm font-medium text-ink">{c.profile}</span>
          <Select value={form.profile} onValueChange={(v) => setForm({ ...form, profile: v })}>
            <SelectTrigger className="mt-2 rounded-none">
              <SelectValue placeholder={c.profilePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {c.profiles.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          {c.message}
        </label>
        <Textarea
          id="contact-message"
          rows={5}
          maxLength={2000}
          placeholder={c.messagePlaceholder}
          className="mt-2 rounded-none"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-none">
        {isSubmitting ? c.sending : c.submit}
      </Button>
    </NetlifyForm>
  );
};

export default ContactForm;
