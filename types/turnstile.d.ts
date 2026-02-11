/** Type declarations for Cloudflare Turnstile widget */
interface TurnstileWidget {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark' | 'auto';
      size?: 'normal' | 'compact';
      callback?: (token: string) => void;
      'error-callback'?: () => void;
    }
  ) => string;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileWidget;
  }
}

export {};
