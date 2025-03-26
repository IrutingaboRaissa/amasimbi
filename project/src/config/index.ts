export const config = {
  // API Configuration
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  },

  // App Information
  app: {
    name: import.meta.env.VITE_APP_NAME || 'AMASIMBI',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Your trusted platform for reproductive health education in Rwanda',
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  },

  // File Upload
  upload: {
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880', 10),
    allowedTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif').split(','),
  },

  // Session
  session: {
    timeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600000', 10),
  },
}; 