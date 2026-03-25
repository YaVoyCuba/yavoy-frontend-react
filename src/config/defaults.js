const DEFAULTS = {
  mail: import.meta.env.VITE_DEFAULT_MAIL || 'servicios@yavoycuba.com',
  phone: import.meta.env.VITE_DEFAULT_PHONE || '+1 (305) 645-7572',
  place: import.meta.env.VITE_DEFAULT_PLACE || '315 Navarre Ave, Unit 2 Coral Gables, FL 33134',
  whatsapp: import.meta.env.VITE_DEFAULT_WHATSAPP || import.meta.env.VITE_DEFAULT_PHONE || '+1 (305) 645-7572',
};

export default DEFAULTS;
