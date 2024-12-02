'use client'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import { User, Shield, ClipboardMinus, FileText, Plus, List, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import logo from './logo.png'
import { ReactNode } from 'react'
import { SecondaryMenu } from '../dropdown/interfaces/Types'
import { useRouter } from 'next/navigation'

export const Sidebar = () => {
  const router = useRouter()
  const secondaryMenus: SecondaryMenu = {
    usuarios: [
      { label: 'Adicionar', href: '/usuario/adicionar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Listar', href: '/usuario/listar', icon: <List className="w-4 h-4" /> },
      { label: 'Editar', href: '/usuario/editar', icon: <Edit className="w-4 h-4" /> },
      { label: 'Remover', href: '/usuario/remover', icon: <Trash2 className="w-4 h-4" /> },
    ],
    perfilAcesso:[
      { label: 'Adicionar', href: '/perfil-de-acesso/adicionar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Listar', href: '/perfil-de-acesso/listar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Editar', href: '/perfil-de-acesso/editar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Remover', href: '/perfil-de-acesso/remover', icon: <Plus className="w-4 h-4" /> },
    ],
    permissoes: [
      { label: 'Adicionar', href: '/permissao/adicionar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Listar', href: '/permissao/listar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Editar', href: '/permissao/editar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Remover', href: '/permissao/remover', icon: <Plus className="w-4 h-4" /> },
    ],
    relatorios:[
      { label: 'Gerar', href: '/relatorio/gerar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Listar', href: '/relatorio/listar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Baixar', href: '/relatorio/baixar', icon: <Plus className="w-4 h-4" /> },
      { label: 'Enviar', href: '/relatorio/enviar', icon: <Plus className="w-4 h-4" /> },
    ],
  }

  const renderSecondaryMenu = (
    menuItems: { label: string, href: string, icon: ReactNode }[]
  ) => (
    <div className="flex flex-col space-y-2">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer text-white"
          onClick={() => router.push(item.href)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  )


  return (
    <aside className="w-56 flex flex-col items-center">
      <div className="flex items-center justify-center p-6">
        <Image
          width={130}
          height={130}
          src={logo}
          alt="logotipo"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex h-0 w-full border-t border-gray-500/50"></div>
      <nav className="py-4 ml-3">
        <DropdownMenu
          items={[
            {
              label: 'Usuários',
              href: '/usuario',
              content: renderSecondaryMenu(secondaryMenus['usuarios']),
              icon: <User className="w-5 h-5" />,
            },
            {
              label: 'Perfil de Acesso',
              href: '/perfil-de-acesso',
              content: renderSecondaryMenu(secondaryMenus['perfilAcesso']),
              icon: <Shield className="w-5 h-5" />,
            },
            {
              label: 'Permissões',
              href: '/permissao',
              content: renderSecondaryMenu(secondaryMenus['permissoes']),
              icon: <ClipboardMinus className="w-5 h-5" />,
            },
            {
              label: 'Relatórios',
              href: '/relatorio',
              content: renderSecondaryMenu(secondaryMenus['relatorios']),
              icon: <FileText className="w-5 h-5" />,
            },
          ]}
          initialLabel="Selecione"
          position="center"
        />
      </nav>
    </aside>
  )
}
