import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { IHttpClientService } from './i-http-client';
import { HttpError } from './fetch-error';
import type ILogger from '../../utils/logger/i-logger';
import { ILoggerToken } from '../../utils/logger/i-logger';

@injectable()
export default class HttpAxiosClient implements IHttpClientService {
  private client: AxiosInstance;
  private logger: ILogger;
  private baseUrl = '';
  private baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(@inject(ILoggerToken) logger: ILogger) {
    this.logger = logger;
    this.client = axios.create();
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/+$/, '');
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    body?: unknown,
    config: RequestInit = {}
  ): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}/${url.replace(/^\/+/, '')}`;

    const headers: Record<string, string> = {
      ...this.baseHeaders,
      ...(config.headers as Record<string, string>),
    };

    const axiosConfig: AxiosRequestConfig = {
      method,
      url: fullUrl,
      headers,
      data: body,
      signal: config.signal === null ? undefined : config.signal,
    };

    try {
      const response = await this.client.request<T>(axiosConfig);
      return response.data;
    } catch (error: any) {
      const status = error.response?.status ?? 500;
      const statusText = error.response?.statusText ?? 'Unknown Error';
      const data = error.response?.data;

      this.logger.error(`HTTP Error: ${status} ${statusText}`, {
        method,
        url: fullUrl,
        status,
        statusText,
        body: data,
      });

      throw new HttpError(status, statusText, data);
    }
  }

  get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('get', url, undefined, config);
  }

  post<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('post', url, body, config);
  }

  put<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('put', url, body, config);
  }

  patch<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('patch', url, body, config);
  }

  delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('delete', url, undefined, config);
  }
}