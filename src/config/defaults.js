const DEFAULTS = {
  mail: import.meta.env.VITE_DEFAULT_MAIL || 'servicios@yavoycuba.com',
  phone: import.meta.env.VITE_DEFAULT_PHONE || '+1 (305) 645-7572',
  place: import.meta.env.VITE_DEFAULT_PLACE || 'Miami, FL, USA',
};

export default DEFAULTS;
