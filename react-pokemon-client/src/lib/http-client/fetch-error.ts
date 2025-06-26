export class HttpError extends Error {
    public readonly name = 'HttpError';
    public readonly status: number;
    public readonly statusText: string;
    public readonly body?: unknown;

    constructor(status: number, statusText: string, body?: unknown)
    {
      super(`${status} ${statusText}`);
      this.status = status;
      this.statusText = statusText;
      this.body = body;
    }
}

export async function parseJsonSafely(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return undefined;
  }
}