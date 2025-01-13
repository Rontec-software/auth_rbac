import { useSession } from '@/hooks/useSession';
import { useCallback } from 'react';
import { HttpMethod } from '../model/api';
import { apiRequest } from './api';

export default function useApi<T>() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const { getToken } = useSession();

  const httpRequest = useCallback(
    async (path: string, method: HttpMethod, body?: T) => {
      const token = getToken();
      return await apiRequest<T>(baseUrl, path, method, token, body);
    },
    [baseUrl, getToken]
  );

  return { httpRequest };
}
