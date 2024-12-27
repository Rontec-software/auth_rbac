import { Header } from '@/components/header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import type { Metadata } from 'next'
import '../globals.css'
import { DrawerMenu } from '@/components/drawer-menu/DrawerMenu'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar para dispositivos maiores */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* DrawerMenu para dispositivos móveis */}
      <div className="md:hidden">
        <DrawerMenu />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col w-full h-full">
        {/* Cabeçalho para telas grandes */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Main ocupa todo o espaço restante */}
        <main className="flex flex-1 w-full h-full bg-background-secondary justify-center items-center overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
