import { toast } from 'react-toastify';
import { isDev, isPreview, isProd } from '../../env-switch';

// Runtime-safe LogLevel like GitBranch
export const LogLevel = {
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

const getEnvironmentLabel = (): string => {
  if (isDev()) return 'DEVELOPMENT';
  if (isPreview()) return 'PREVIEW';
  return 'PRODUCTION';
};

export const Logger = {
  log(level: LogLevel, message: string, ...args: unknown[]): void {
    const envLabel = getEnvironmentLabel();
    const formattedMessage = `[${envLabel}] [${level.toUpperCase()}] ${message}`;

    if (isDev() || isPreview()) {
      switch (level) {
        case LogLevel.Info:
          console.info(formattedMessage, ...args);
          break;
        case LogLevel.Warn:
          console.warn(formattedMessage, ...args);
          break;
        case LogLevel.Error:
          console.error(formattedMessage, ...args);
          break;
      }
    }
    if (isProd() && level === LogLevel.Error) {
      console.error(formattedMessage, ...args);
    }
  },

  // WARNING: toast methods are browser-only (React context)
  toast(level: LogLevel, message: string): void {
    if (typeof window === 'undefined') return; // Skip in Node.js (e.g., vite.config.js)

    const envLabel = getEnvironmentLabel();
    const formattedMessage = `[${envLabel}] ${message}`;

    if (isDev()) {
      switch (level) {
        case LogLevel.Info:
          toast.info(formattedMessage, { toastId: message });
          break;
        case LogLevel.Warn:
          toast.warn(formattedMessage, { toastId: message });
          break;
        case LogLevel.Error:
          toast.error(formattedMessage, { toastId: message });
          break;
      }
    } else if (isPreview()) {
      if (level === LogLevel.Warn || level === LogLevel.Error) {
        toast[level](formattedMessage, { toastId: message });
      }
    } else if (isProd()) {
      if (level === LogLevel.Error) {
        toast.error(formattedMessage, { toastId: message });
      }
    }
  },

  info(message: string, ...args: unknown[]): void {
    this.log(LogLevel.Info, message, ...args);
    this.toast(LogLevel.Info, message);
  },

  warn(message: string, ...args: unknown[]): void {
    this.log(LogLevel.Warn, message, ...args);
    this.toast(LogLevel.Warn, message);
  },

  error(message: string, ...args: unknown[]): void {
    this.log(LogLevel.Error, message, ...args);
    this.toast(LogLevel.Error, message);
  },

  toastInfo(message: string): void {
    this.toast(LogLevel.Info, message);
  },

  toastWarn(message: string): void {
    this.toast(LogLevel.Warn, message);
  },

  toastError(message: string): void {
    this.toast(LogLevel.Error, message);
  },
};