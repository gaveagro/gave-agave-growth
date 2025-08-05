// src/types/facebook-pixel.d.ts
interface Window {
  fbq?: (event: string, type: string, data?: Record<string, unknown>) => void;
}

declare const fbq: Window['fbq'];
