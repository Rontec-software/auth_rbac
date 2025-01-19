import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { useCallback } from 'react';
import ResponseApi from '../model/ResponseApi';
import { apiRequest } from './api';

export function useApi() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const { getToken, clearToken } = useSession();
  const { setIsAuthenticated } = useAuth();
  const token = getToken();

  const get = useCallback(
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

  const post = useCallback(
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

  const put = useCallback(
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

  const patch = useCallback(
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

  const del = useCallback(
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

  return { get, post, put, patch, del };
}
