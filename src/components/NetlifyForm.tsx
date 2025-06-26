
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
      <input type="hidden" name="bot-field" />
      {children}
    </form>
  );
};

export default NetlifyForm;
