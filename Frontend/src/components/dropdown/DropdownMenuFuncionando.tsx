'use client'
import { FC, ReactNode, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ChevronDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MenuItem {
  label: string
  href: string
  content: ReactNode // Conteúdo dinâmico para cada rota
  icon?: ReactNode // Ícone opcional para o item
}

interface DropdownMenuProps {
  items: MenuItem[]
  initialLabel?: string
  position?: 'left' | 'right' | 'center'
}

const secondaryMenus: Record<string, string[]> = {
  usuarios: ['Adicionar', 'Listar', 'Editar', 'Remover'],
  perfisAcesso: ['Criar', 'Listar', 'Editar', 'Remover'],
  permissoes: ['Adicionar', 'Listar', 'Editar', 'Remover'],
  relatorios: ['Gerar', 'Listar', 'Baixar', 'Enviar'],
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  items,
  initialLabel = 'Menu',
  position = 'center',
}) => {
  const [selectedLabel, setSelectedLabel] = useState(initialLabel)
  const [selectedContent, setSelectedContent] = useState<ReactNode>(null)
  const [selectedIcon, setSelectedIcon] = useState<ReactNode>(null)
  const router = useRouter()

  const handleNavigation = (
    href: string,
    label: string,
    content: ReactNode,
    icon: ReactNode
  ) => {
    setSelectedLabel(label)
    setSelectedIcon(icon)

    //* Verifica se o item tem menus secundários
    if (secondaryMenus[label]) {
      setSelectedContent(renderSecondaryMenu(label))
    } else {
      setSelectedContent(content)
      router.push(href)
    }
  }

  const renderSecondaryMenu = (parentLabel: string) => {
    const menuItems = secondaryMenus[parentLabel]
    return (
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-gray-300">{parentLabel}</h3>
        {menuItems.map((subItem) => (
          <button
            key={subItem}
            className="px-4 py-2 text-left text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            {subItem}
          </button>
        ))}
      </div>
    )
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-0'
      case 'right':
        return 'right-0'
      case 'center':
        return 'left-1/2 transform -translate-x-1/2'
      default:
        return ''
    }
  }

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div className='flex justify-center w-full'>
          <MenuButton className="inline-flex justify-center w-56 px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {selectedIcon && <span className="mr-2">{selectedIcon}</span>}
            {selectedLabel}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 mr-0 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </MenuButton>
        </div>
        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={clsx(
              'absolute mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10',
              getPositionClasses()
            )}
          >
            {items.map(({ label, href, content, icon }) => (
              <MenuItem key={label}>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={() => handleNavigation(href, label, content, icon)}
                    className={clsx(
                      'group flex items-center w-full px-4 py-2 text-sm',
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-200'
                    )}
                  >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
      {/* Div de conteúdo secundário */}
      {selectedContent && (
        <div className="mt-4 p-4 rounded-md shadow-md">
          {selectedContent}
        </div>
      )}
    </div>
  )
}