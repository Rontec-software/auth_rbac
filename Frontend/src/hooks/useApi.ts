import { useSession } from '@/hooks/useSession'
import { useCallback } from 'react'
import ResponseApi from '../data/model/ResponseApi'

export default function useApi<T>() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!
  const { getToken } = useSession()
  const httpPost = useCallback(
    async function (path: string, body: T): Promise<ResponseApi<T>> {
      const url = `${baseUrl}${path}`
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(body),
        })
        const json = res.status === 204 ? null : await res.json()
        return {
          json: json && null,
          status: res.status,
          success: sucesso(res.status),
          errors: json?.errors ?? [],
        }
      } catch (error) {
        console.error('Erro ao realizar fetch:', error)
        return {
          json: null,
          status: 500,
          success: false,
          errors: [
            { field: 'global', message: 'Erro no servidor ou conexão.' },
          ],
        }
      }
    },
    [baseUrl, getToken]
  )

  function sucesso(status: number): boolean {
    return status >= 200 && status < 300
  }

  return { httpPost }
}