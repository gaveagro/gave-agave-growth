declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      ready: (callback: () => void) => void;
      enterprise: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
        ready: (callback: () => void) => void;
      };
    };
  }
}

export {};