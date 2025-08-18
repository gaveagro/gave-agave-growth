// Google Analytics utilities
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date() as any);
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-G6JX7M9JHJ', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
};

// Track events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType: string, success: boolean = true) => {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formType,
    success: success
  });
};

// Track investment simulations
export const trackInvestmentSimulation = (amount: number, years: number) => {
  trackEvent('investment_simulation', {
    event_category: 'calculator',
    investment_amount: amount,
    investment_years: years,
    value: amount
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    event_category: 'cta',
    event_label: ctaName,
    cta_location: location
  });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage
  });
};

// Track file downloads
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    event_category: 'download',
    event_label: fileName,
    file_type: fileType
  });
};
