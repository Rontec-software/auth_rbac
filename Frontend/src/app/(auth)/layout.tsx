import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { AuthProvider } from '@/context/auth/authContext';
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
    <AuthProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 p-2">
          <Header />
          <main className="flex flex-1 justify-center items-center bg-background-secondary overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
