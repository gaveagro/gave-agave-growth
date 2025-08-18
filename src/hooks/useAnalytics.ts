import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '@/lib/analytics';

// Hook para inicializar y gestionar Google Analytics
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializar GA4 cuando el componente se monta
    // Reemplaza 'G-XXXXXXXXXX' con tu ID real de Google Analytics
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    initGA(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    // Trackear cambios de página/ruta
    trackPageView(location.pathname + location.search);
  }, [location]);

  return {
    // Funciones de tracking disponibles para componentes
    trackPageView,
  };
};

// Hook para trackear scroll depth
export const useScrollTracking = () => {
  useEffect(() => {
    let scrollDepthMarkers = [25, 50, 75, 100];
    let trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      scrollDepthMarkers.forEach(marker => {
        if (scrollPercent >= marker && !trackedDepths.has(marker)) {
          trackedDepths.add(marker);
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: `${marker}%`,
              value: marker
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};