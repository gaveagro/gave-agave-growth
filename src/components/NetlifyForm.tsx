
import { useState } from 'react';

interface NetlifyFormProps {
  formName: string;
  children: React.ReactNode;
  className?: string;
  onSubmit?: () => Promise<void> | void;
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
    const honeypotValue = formData.get('bot-field') || formData.get('website');
    if (honeypotValue) {
      console.log('Bot detected, blocking submission');
      setIsSubmitting(false);
      return;
    }

    // Additional anti-bot: time-based protection
    const formStartTime = formData.get('form-start-time');
    const currentTime = Date.now();
    if (formStartTime && (currentTime - parseInt(formStartTime as string, 10)) < 3000) {
      console.log('Form submitted too quickly, blocking submission');
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit?.();
    } catch (error) {
      console.error(`Form submission error for ${formName}:`, error);
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
