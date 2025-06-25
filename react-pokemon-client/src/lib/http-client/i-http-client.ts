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

//probably deprecated, I will unify the interface with the axios one
// this is the interface for the axios client, it should be used in the services that use axios
//but it has issues, now abort controller is not supported, so I will use the native fetch
export interface IHttpClientAxios {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}