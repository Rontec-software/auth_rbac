import { HttpMethod } from '../model/api';
import ResponseApi from '../model/ResponseApi';

export async function apiRequest<T>(
  baseUrl: string,
  path: string,
  method: HttpMethod,
  token: string | null,
  body?: T
): Promise<ResponseApi<T>> {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = res.status === 204 ? null : await res.json();

  return {
    json: json || null,
    status: res.status,
    success: res.status >= 200 && res.status < 300,
    errors: json?.errors ?? [],
  };
}
