import { toast } from 'react-toastify';
import { isDev, isPreview, isProd} from '../env';

export type LogLevel = 'info' | 'warn' | 'error';

export const Logger = {
  // Basic console logging with environment filtering
  log(level: LogLevel, message: string, ...args: unknown[]): void {
    if (isDev() || isPreview()) {
      // Show console logs in dev and preview environments
      switch (level) {
        case 'info':
          console.info(`[INFO] ${message}`, ...args);
          break;
        case 'warn':
          console.warn(`[WARN] ${message}`, ...args);
          break;
        case 'error':
          console.error(`[ERROR] ${message}`, ...args);
          break;
      }
    }
    // In production, only log errors to console
    if (isProd() && level === 'error') {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },

  // Toast notifications with environment-specific behavior
  toast(level: LogLevel, message: string): void {
    if (isDev()) {
      // In development, show all toasts
      switch (level) {
        case 'info':
          toast.info(message, { toastId: message });
          break;
        case 'warn':
          toast.warn(message, { toastId: message });
          break;
        case 'error':
          toast.error(message, { toastId: message });
          break;
      }
    } else if (isPreview()) {
      // In preview, show only warnings and errors
      if (level === 'warn' || level === 'error') {
        toast[level](message, { toastId: message });
      }
    } else if (isProd()) {
      // In production, show only errors
      if (level === 'error') {
        toast.error(message, { toastId: message });
      }
    }
  },

  // Shorthand methods for convenience
  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
    this.toast('info', message);
  },

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
    this.toast('warn', message);
  },

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
    this.toast('error', message);
  },

  // Alias for toast-specific calls
  toastInfo(message: string): void {
    this.toast('info', message);
  },

  toastWarn(message: string): void {
    this.toast('warn', message);
  },

  toastError(message: string): void {
    this.toast('error', message);
  },
};