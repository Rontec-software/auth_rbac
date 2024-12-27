import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import type { Metadata } from 'next';
import '../globals.css';
import { DrawerMenu } from '@/components/drawer-menu/DrawerMenu';

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
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <DrawerMenu />
      </div>
      <div className="flex flex-col flex-1 p-2">
        <Header />
        <main className="flex flex-1 justify-center items-center bg-background-secondary overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
