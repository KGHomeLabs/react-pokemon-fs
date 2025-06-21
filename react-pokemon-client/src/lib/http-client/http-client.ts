import type { AxiosInstance, AxiosRequestConfig,AxiosResponse } from 'axios';
import type IHttpClientService from './i-http-client';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export default class HttpClient implements IHttpClientService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private async request<T>(method: HttpMethod, url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.request<T>({ method, url, data, ...config });
      return response.data;
    } catch (error) {
      console.error(`[HttpClient] ${method.toUpperCase()} ${url}`, error);
      throw error;
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, undefined, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('put', url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('patch', url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('delete', url, undefined, config);
  }
}