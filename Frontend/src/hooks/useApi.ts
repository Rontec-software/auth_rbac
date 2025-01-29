import { useSession } from '@/hooks/useSession';
import { useCallback } from 'react';
import ResponseApi from './model/ResponseApi';
import { apiRequest } from './api';
import { useAuth } from './useAuth';

export default function useApi<T>() {

  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const { getToken, clearToken } = useSession();
  const { setIsAuthenticated } = useAuth();
  const token = getToken();

  const httpPost = useCallback(
    async <TResponse, TBody>(
      path: string,
      body: TBody,
      options?: { query?: Record<string, any> }
    ): Promise<ResponseApi<TResponse>> => {
      const response = await apiRequest<TResponse, TBody>(
        baseUrl,
        path,
        'POST',
        {
          ...options,
          body,
          token,
        }
      );
      if (response && response.status === 401) {
        clearToken();
        setIsAuthenticated(false);
      }
      return response;
    },
    [baseUrl, token]
  );

  const httpGet = useCallback(
    async <TResponse>(
      path: string,
      options?: { query?: Record<string, any> }
    ): Promise<ResponseApi<TResponse>> => {
      const response = await apiRequest<TResponse>(baseUrl, path, 'GET', {
        ...options,
        token,
      });
      if (response && response.status === 401) {
        clearToken();
        setIsAuthenticated(false);
      }
      return response;
    },
    [baseUrl, token]
  );

  const httpPut = useCallback(
    async <TResponse, TBody>(
      path: string,
      body: TBody,
      options?: { query?: Record<string, any> }
    ): Promise<ResponseApi<TResponse>> => {
      const response = await apiRequest<TResponse, TBody>(
        baseUrl,
        path,
        'PUT',
        {
          ...options,
          body,
          token,
        }
      );
      if (response && response.status === 401) {
        clearToken();
        setIsAuthenticated(false);
      }
      return response;
    },
    [baseUrl, token]
  );

  const httpPatch = useCallback(
    async <TResponse, TBody>(
      path: string,
      body: TBody,
      options?: { query?: Record<string, any> }
    ): Promise<ResponseApi<TResponse>> => {
      const response = await apiRequest<TResponse, TBody>(
        baseUrl,
        path,
        'PATCH',
        {
          ...options,
          body,
          token,
        }
      );
      if (response && response.status === 401) {
        clearToken();
        setIsAuthenticated(false);
      }
      return response;
    },
    [baseUrl, token]
  );

  const httpDel = useCallback(
    async <TResponse>(
      path: string,
      options?: { query?: Record<string, any> }
    ): Promise<ResponseApi<TResponse>> => {
      const response = await apiRequest<TResponse>(baseUrl, path, 'DELETE', {
        ...options,
        token,
      });
      if (response && response.status === 401) {
        clearToken();
        setIsAuthenticated(false);
      }
      return response;
    },
    [baseUrl, token]
  );

  return { httpPost, httpGet, httpPut, httpPatch, httpDel };
}
