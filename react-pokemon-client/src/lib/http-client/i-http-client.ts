import type { AxiosRequestConfig } from 'axios';

export const IHttpClientServiceToken = Symbol.for('IHttpClientService');

export interface IHttpClientService {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, body?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, body?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, body?: unknown, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  setBaseUrl(url: string): void;
}
