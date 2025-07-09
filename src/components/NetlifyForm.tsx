
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface NetlifyFormProps {
  formName: string;
  children: React.ReactNode;
  className?: string;
  onSubmit?: () => void;
}

export const NetlifyForm: React.FC<NetlifyFormProps> = ({ 
  formName, 
  children, 
  className,
  onSubmit 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Anti-bot protection: check honeypot field
    const honeypotValue = formData.get('bot-field');
    if (honeypotValue) {
      console.log('Bot detected, blocking submission');
      setIsSubmitting(false);
      return;
    }

    // Additional anti-bot: time-based protection
    const formStartTime = formData.get('form-start-time');
    const currentTime = Date.now();
    if (formStartTime && (currentTime - parseInt(formStartTime as string)) < 3000) {
      console.log('Form submitted too quickly, blocking submission');
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert FormData to a regular object
      const submitData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        investmentAmount: formData.get('investmentAmount') as string,
        investmentModel: formData.get('investmentModel') as string,
        message: formData.get('message') as string,
        formType: formName
      };

      console.log('Submitting form data:', submitData);

      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('form-submission', {
        body: submitData,
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('Form submission response:', data);
      toast.success('¡Mensaje enviado exitosamente!');
      form.reset();
      onSubmit?.();

    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      {/* Primary honeypot - hidden from users */}
      <div style={{ display: 'none' }}>
        <label>
          Don't fill this out if you're human:
          <input name="bot-field" />
        </label>
      </div>
      {/* Secondary honeypot with CSS hiding */}
      <input 
        type="text" 
        name="website" 
        placeholder="Website" 
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
        tabIndex={-1}
        autoComplete="off"
      />
      {/* Time-based protection */}
      <input type="hidden" name="form-start-time" value={Date.now()} />
      {children}
      {isSubmitting && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Enviando...</p>
        </div>
      )}
    </form>
  );
};

export default NetlifyForm;
