
import { useState } from 'react';
import { toast } from 'sonner';

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
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        toast.success('¡Mensaje enviado exitosamente!');
        form.reset();
        onSubmit?.();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={className}
    >
      <input type="hidden" name="form-name" value={formName} />
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
    </form>
  );
};

export default NetlifyForm;
