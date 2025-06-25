export const ILoggerToken = Symbol.for('ILogger');

export default interface ILogger {
  log(level: 'info' | 'warn' | 'error', message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;

  toast(level: 'info' | 'warn' | 'error', message: string): void;
  toastInfo(message: string): void;
  toastWarn(message: string): void;
  toastError(message: string): void;
}