import { useCallback } from 'react';
import ResponseApi from '../model/ResponseApi';

export default function useApi<T>() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

  const httpPost = useCallback(
    async function (path: string, body: T): Promise<ResponseApi<T>> {
      const url = `${baseUrl}${path}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const json = res.status === 204 ? null : await res.json();
      // TODO: Criar função renderizarErrosSeExistir
      // renderizarErrosSeExistir(json.erros)

      return {
        json: json && null,
        status: res.status,
        success: sucesso(res.status),
        errors: json?.errors ?? [],
      };
    },
    [baseUrl]
  );

  function sucesso(status: number): boolean {
    return status >= 200 && status < 300;
  }

  return { httpPost };
}
