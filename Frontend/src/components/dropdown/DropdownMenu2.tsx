import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDownIcon, ClipboardMinus, FileText, Shield, User } from 'lucide-react'
import { FC } from 'react'
import { useRouter } from 'next/router'  // Importando useRouter
import SecondaryMenu from './SecondaryMenu'

interface MenuItem {
  label: string
  href: string
  content: React.ReactNode
  icon: React.ReactNode
}

const DropdownMenu: FC = () => {
  const router = useRouter()

  const secondaryMenus = {
    usuarios: [
      { label: 'Adicionar', href: '/usuario/adicionar' },
      { label: 'Listar', href: '/usuario/listar' },
      { label: 'Editar', href: '/usuario/editar' },
      { label: 'Remover', href: '/usuario/remover' },
    ],
    perfilAcesso: [
      { label: 'Criar', href: '/perfil/criar' },
      { label: 'Listar', href: '/perfil/listar' },
      { label: 'Editar', href: '/perfil/editar' },
      { label: 'Remover', href: '/perfil/remover' },
    ],
    permissoes: [
      { label: 'Adicionar', href: '/permissoes/adicionar' },
      { label: 'Listar', href: '/permissoes/listar' },
      { label: 'Editar', href: '/permissoes/editar' },
      { label: 'Remover', href: '/permissoes/remover' },
    ],
    relatorios: [
      { label: 'Adicionar', href: '/relatorios/adicionar' },
      { label: 'Gerar', href: '/relatorios/gerar' },
      { label: 'Baixar', href: '/relatorios/baixar' },
      { label: 'Enviar', href: '/relatorios/enviar' },
    ],
  }

  const dropdownItems: MenuItem[] = [
    {
      label: 'Usuários',
      href: '/usuario',
      content: <SecondaryMenu items={secondaryMenus.usuarios} />,
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'Perfil de Acesso',
      href: '/perfil-de-acesso',
      content: <SecondaryMenu items={secondaryMenus.perfilAcesso} />,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      label: 'Permissões',
      href: '/permissoes',
      content: <SecondaryMenu items={secondaryMenus.permissoes} />,
      icon: <ClipboardMinus className="w-5 h-5" />,
    },
    {
      label: 'Relatórios',
      href: '/relatorios',
      content: <SecondaryMenu items={secondaryMenus.relatorios} />,
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)  // Usando router.push para navegação
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center w-56 px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {dropdownItems[0].icon && <span className="mr-2">{dropdownItems[0].icon}</span>}
        Menu
        <ChevronDownIcon className="w-5 h-5 ml-2 mr-0 text-violet-200 hover:text-violet-100" />
      </MenuButton>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {dropdownItems.map(({ label, href, content, icon }) => (
            <MenuItem key={label}>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => 
                    handleNavigation(label, icon, content, href) // Navegando ao clicar
                    setSelectedLabel(label)
                    setSelectedIcon(icon)
                  }  
                  className={clsx(
                    'group flex items-center w-full px-4 py-2 text-sm',
                    active ? 'bg-gray-200 text-gray-900' : 'text-gray-200'
                  )}
                >
                  {icon && <span className="mr-2">{icon}</span>}  {/* Ícones sendo passados */}
                  {label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
