import { Header } from '@/components/header/Header';
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 p-2">
        <Header />
        <main className="bg-background-secondary flex-1 m-8  overflow-y-auto rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
}
