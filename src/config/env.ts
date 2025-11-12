export const env = {
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || (window as any).__API_BASE_URL__ || '',
};

if (!env.apiBaseUrl) {
  // Optional console warning to prompt configuration during development
  // eslint-disable-next-line no-console
  console.warn('VITE_API_BASE_URL is not set. Configure it in your .env file.');
}
