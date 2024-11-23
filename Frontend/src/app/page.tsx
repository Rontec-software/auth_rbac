import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Duas rotas existentes</h1>
      <h1>
        URL Login:
        <Link href={'http://localhost:3000/login'}>
          http://localhost:3000/login
        </Link>
      </h1>

      <h1>
        URL User:
        <Link href={'http://localhost:3000/user'}>
          http://localhost:3000/user
        </Link>
      </h1>
    </div>
  );
}
