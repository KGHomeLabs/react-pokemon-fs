import { injectable } from 'tsyringe';
import { toast } from 'react-toastify';
import { isDev, isPreview, isProd } from '../../../config/env-switch';
import type  ILogger  from './i-logger';

@injectable()
export class LoggerService implements ILogger {
  private getEnvironmentLabel(): string 
  {
    if (isDev()) return 'DEVELOPMENT';
    if (isPreview()) return 'PREVIEW';
    return 'PRODUCTION';
  }

  log(level: 'info' | 'warn' | 'error', message: string, ...args: unknown[]): void 
  {
    const envLabel = this.getEnvironmentLabel();
    const formattedMessage = `[${envLabel}] [${level.toUpperCase()}] ${message}`;

    if (isDev() || isPreview()) {
      console[level](formattedMessage, ...args);
    }

    if (isProd() && level === 'error') {
      console.error(formattedMessage, ...args);
    }
  }

  toast(level: 'info' | 'warn' | 'error', message: string): void 
  {
    // Ensure this runs only in the browser environment
    // This is important because toastify relies on the DOM
    if (typeof window === 'undefined') return;

    const envLabel = this.getEnvironmentLabel();
    const formattedMessage = `[${envLabel}] ${message}`;

    if (isDev()) {
      toast[level](formattedMessage, { toastId: message });
    } else if (isPreview() && (level === 'warn' || level === 'error')) {
      toast[level](formattedMessage, { toastId: message });
    } else if (isProd() && level === 'error') {
      toast.error(formattedMessage, { toastId: message });
    }
  }

  info(message: string, ...args: unknown[]): void 
  {
    this.log('info', message, ...args);
    this.toast('info', message);
  }

  warn(message: string, ...args: unknown[]): void 
  {
    this.log('warn', message, ...args);
    this.toast('warn', message);
  }

  error(message: string, ...args: unknown[]): void 
  {
    this.log('error', message, ...args);
    this.toast('error', message);
  }

  toastInfo(message: string): void 
  {
    this.toast('info', message);
  }

  toastWarn(message: string): void 
  {
    this.toast('warn', message);
  }

  toastError(message: string): void 
  {
    this.toast('error', message);
  }
}