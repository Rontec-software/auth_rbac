'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h1>Duas rotas existentes</h1>
      <h1 className="flex flex-col">
        URL Login:
        <Link href={'http://localhost:3000/login'}>
          http://localhost:3000/login
        </Link>
      </h1>

      <h1 className="flex flex-col">
        URL User:
        <Link href={'http://localhost:3000/usuario'}>
          http://localhost:3000/usuario
        </Link>
      </h1>
      <button
        className="button text-lg p-6"
        onClick={() => router.push('/recuperar-senha')}
      >
        Rota Recuperar Senha
      </button>
    </div>
  );
}
