import { useLocation } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

// Digits with country code. Can be overridden with VITE_WHATSAPP_NUMBER in Netlify.
const DEFAULT_WHATSAPP_NUMBER = '524444836582';
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');

const MESSAGES: Record<string, string> = {
  '/hijuelos-espadin': 'Hola, me interesa cotizar hijuelos de agave espadín.',
  '/vivero': 'Hola, me interesa cotizar planta de agave (espadín o salmiana).',
  '/servicios': 'Hola, tengo un rancho y me interesa regenerarlo con Gavé.',
  '/inversion-de-impacto': 'Hola, me interesa invertir en plantas de agave con Gavé.',
  '/crowdgrowing': 'Hola, me interesa invertir en plantas de agave con Gavé.',
};
const DEFAULT_MESSAGE = 'Hola, vengo del sitio de Gavé y me gustaría más información.';

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  if (!WHATSAPP_NUMBER || pathname.startsWith('/admin')) return null;

  const text = MESSAGES[pathname] ?? DEFAULT_MESSAGE;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => {
        trackCTAClick('whatsapp', pathname);
        if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Contact', { content_name: 'WhatsApp', content_category: pathname });
        }
      }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C8.84 3 3.01 8.83 3.01 15.994c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75a12.95 12.95 0 0 0 6.32 1.62h.005C23.165 28.87 29 23.04 29 15.876 29 8.712 23.17 3 16.004 3Zm0 23.68h-.004a10.77 10.77 0 0 1-5.49-1.5l-.394-.234-3.965 1.04 1.058-3.866-.257-.397a10.74 10.74 0 0 1-1.65-5.73c0-5.95 4.84-10.79 10.8-10.79 5.95 0 10.79 4.79 10.79 10.67 0 5.95-4.84 10.8-10.79 10.8Zm5.92-8.08c-.324-.162-1.92-.947-2.217-1.055-.297-.108-.513-.162-.73.162-.216.324-.837 1.055-1.026 1.27-.19.217-.378.244-.702.082-.324-.163-1.368-.505-2.606-1.61-.963-.86-1.613-1.92-1.802-2.244-.19-.324-.02-.5.142-.66.146-.146.324-.379.486-.568.163-.19.217-.325.325-.541.108-.217.054-.406-.027-.568-.081-.163-.73-1.76-1-2.41-.263-.632-.53-.546-.73-.556l-.621-.011a1.19 1.19 0 0 0-.865.406c-.297.325-1.135 1.11-1.135 2.705 0 1.596 1.162 3.138 1.324 3.354.162.217 2.287 3.49 5.54 4.894.774.334 1.378.534 1.849.683.777.247 1.484.212 2.043.129.623-.093 1.92-.785 2.19-1.543.27-.758.27-1.407.19-1.543-.082-.135-.298-.216-.622-.379Z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
