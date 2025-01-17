import ResponseApi from '../model/ResponseApi';

export async function apiRequest<TResponse, TBody = undefined>(
  baseUrl: string,
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options?: {
    query?: Record<string, any>;
    body?: TBody;
    token?: string | null;
  }
): Promise<ResponseApi<TResponse>> {
  const queryString = options?.query
    ? `?${new URLSearchParams(
        options.query as Record<string, string>
      ).toString()}`
    : '';

  const fullUrl = `${baseUrl}${path}${queryString}`;
  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const responseData = response.status === 204 ? null : await response.json();

  return {
    json: responseData || null,
    status: response.status,
    success: response.ok,
    errors: responseData?.errors ?? [],
  };
}
