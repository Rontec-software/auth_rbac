'use client'

import { useState } from 'react'
import {
  User,
  Shield,
  ClipboardMinus,
  FileText,
  ChevronDown,
  Menu,
  X,
  Plus,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '../../../public/logo.png'

export const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const router = useRouter()
  const closeDrawer = () => setIsOpen(false)

  const menus = [
    {
      label: 'Usuários',
      icon: <User className="w-5 h-5" />,
      submenus: [
        { icon: <Plus className='w-5 h-5' />, label: 'Adicionar', href: '/usuario/adicionar' },
        { label: 'Listar', href: '/usuario/listar' },
        { label: 'Editar', href: '/usuario/editar' },
        { label: 'Remover', href: '/usuario/remover' },
      ],
    },
    {
      label: 'Perfil de Acesso',
      icon: <Shield className="w-5 h-5" />,
      submenus: [
        { label: 'Adicionar', href: '/perfil-de-acesso/adicionar' },
        { label: 'Listar', href: '/perfil-de-acesso/listar' },
        { label: 'Editar', href: '/perfil-de-acesso/editar' },
        { label: 'Remover', href: '/perfil-de-acesso/remover' },
      ],
    },
    {
      label: 'Permissões',
      icon: <ClipboardMinus className="w-5 h-5" />,
      submenus: [
        { label: 'Adicionar', href: '/permissao/adicionar' },
        { label: 'Listar', href: '/permissao/listar' },
        { label: 'Editar', href: '/permissao/editar' },
        { label: 'Remover', href: '/permissao/remover' },
      ],
    },
    {
      label: 'Relatórios',
      icon: <FileText className="w-5 h-5" />,
      submenus: [
        { label: 'Gerar', href: '/relatorio/gerar' },
        { label: 'Listar', href: '/relatorio/listar' },
        { label: 'Baixar', href: '/relatorio/baixar' },
        { label: 'Enviar', href: '/relatorio/enviar' },
      ],
    },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSubMenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label)
  }

  const navigateTo = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* Botão para abrir o menu gaveta */}
      <button
        className={`fixed z-50 p-2 bg-gray-800 drop-shadow-2xl rounded text-white hover:bg-gray-600 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? 'top-4 right-4 p-1 bg-red-700 scale-75 rotate-90'
            : 'top-4 left-4 scale-100 rotate-0'
        }`}
        onClick={toggleMenu}
      >
        {isOpen ? <X size={24} /> : <Menu size={20} />}
      </button>

      {/* Backdrop para clicar fora */}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 backdrop-blur-sm bg-gray-700/60 z-40"
        />
      )}

      {/* Menu gaveta */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-950 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 shadow-lg w-64`}
      >
        {/* Logo no topo */}
        <div className="flex flex-col items-center justify-center pt-6 pb-2 border-b border-gray-700">
          <Image
            src={logo}
            alt="logotipo"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <h2 className="text-xl font-bold">Global Coders</h2>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col p-4 space-y-2">
          {menus.map((menu, index) => (
            <div key={index}>
              {/* Menu principal */}
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-800 rounded hover:bg-gray-600"
                onClick={() => toggleSubMenu(menu.label)}
              >
                <div className="flex items-center space-x-2">
                  {menu.icon}
                  <span>{menu.label}</span>
                </div>
                <ChevronDown
                  className={`transform transition-transform ${
                    activeMenu === menu.label ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Submenus */}
              {activeMenu === menu.label && (
                <div className="mt-2 ml-4 space-y-1">
                  {menu.submenus.map((submenu, idx) => (
                    <button
                      key={idx}
                      className="flex w-full px-4 py-2 text-sm text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
                      onClick={() => navigateTo(submenu.href)}
                    >
                      <div className="flex items-center space-x-2">
                        {submenu.icon}
                        <span>{submenu.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
