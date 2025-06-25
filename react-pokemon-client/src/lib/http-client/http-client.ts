import { injectable } from 'tsyringe';
import type { IHttpClientService } from './i-http-client';
import { HttpError, parseJsonSafely } from './fetch-error';

@injectable()
export default class HttpClient implements IHttpClientService {
  private baseUrl: string = '';
  private baseHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  public setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/+$/, ''); // Remove trailing slashes
  }

  private async request<T>(method: string, url: string, body?: unknown, config: RequestInit = {}): Promise<T>
  {
    const headers = {
      ...this.baseHeaders,
      ...(config.headers || {}),
    };

    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}/${url.replace(/^\/+/, '')}`;

    const res = await fetch(fullUrl, {method, headers, body: body ? JSON.stringify(body) : undefined,signal: config.signal,...config,});

    if (!res.ok) {
      const errorBody = await parseJsonSafely(res);
      throw new HttpError(res.status, res.statusText, errorBody);
    }

    const data = (await parseJsonSafely(res)) as T;
    return data;
  }

  public get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  public post<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('POST', url, body, config);
  }

  public put<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('PUT', url, body, config);
  }

  public patch<T>(url: string, body?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('PATCH', url, body, config);
  }

  public delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}