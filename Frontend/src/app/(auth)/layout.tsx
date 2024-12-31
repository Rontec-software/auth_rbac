import { Header } from '@/components/header/Header';
import { PrivateRoute } from '@/components/privateRoute/privateRouter';
import { Sidebar } from '@/components/sidebar/Sidebar';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Cod3rs - Auth RBAC',
  description: 'Autorização e autenticação com nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 p-2">
          <Header />
          <main className="flex flex-1 justify-center items-center bg-background-secondary overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
