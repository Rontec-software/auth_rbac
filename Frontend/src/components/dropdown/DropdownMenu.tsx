'use client'

import { ChevronDownIcon } from 'lucide-react'
import { DropdownMenuItem } from './interfaces/Types'
import { FC, ReactNode, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface DropdownMenuProps {
  items: DropdownMenuItem[]
  initialLabel?: string
  position?: 'left' | 'right' | 'center'
  className?: string // Personaliza o Container Principal
  menuClassName?: string // Personaliza o Menu
  menuItemClassName?: string // Personaliza o Item do Menu
  buttonClassName?: string // Personaliza o Botão
}

/**
 * DropdownMenu
 *
 * Um componente reutilizável para menus suspensos com suporte a personalização de estilos.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {Array} props.items - Array de itens do menu, cada um com `label`, `href`, `content`, e `icon`.
 * @param {string} [props.initialLabel="Menu"] - Texto inicial do botão.
 * @param {'left' | 'right' | 'center'} [props.position="center"] - Posição do menu relativo ao botão.
 * @param {string} [props.containerClassName] - Classe personalizada para o container principal.
 * @param {string} [props.buttonClassName] - Classe personalizada para o botão principal.
 * @param {string} [props.menuClassName] - Classe personalizada para o menu.
 * @param {string} [props.menuItemClassName] - Classe personalizada para os itens do menu.
 *
 * @example
 * // Exemplo de uso
 * import DropdownMenu from './DropdownMenu';
 * import { HomeIcon, UserIcon, SettingsIcon } from 'lucide-react';
 *
 * const items = [
 *   { label: 'Início', href: '/inicio', icon: <HomeIcon />, content: null },
 *   { label: 'Perfil', href: '/perfil', icon: <UserIcon />, content: null },
 *   { label: 'Configurações', href: '/configuracoes', icon: <SettingsIcon />, content: null },
 * ];
 *
 * const Example = () => (
 *   <DropdownMenu
 *     items={items}
 *     initialLabel="Menu Principal"
 *     position="center"
 *     containerClassName="text-gray-200"
 *     buttonClassName="bg-blue-600 hover:bg-blue-500"
 *     menuClassName="bg-gray-800"
 *     menuItemClassName="hover:bg-blue-400"
 *   />
 * );
 */
const DropdownMenu: FC<DropdownMenuProps> = ({
  items,
  initialLabel = 'Menu',
  position = 'center',
  className,
  menuClassName,
  menuItemClassName,
  buttonClassName,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(initialLabel)
  const [selectedContent, setSelectedContent] = useState<ReactNode>(null)
  const [selectedIcon, setSelectedIcon] = useState<ReactNode>(null)
  const router = useRouter()

  // Função para navegar para a rota do item e renderizar menu secundário, se necessário
  const handleNavigation = (
    href: string,
    label: string,
    content: ReactNode,
    icon: ReactNode
  ) => {
    setSelectedLabel(label)
    setSelectedIcon(icon)

    // Verifica se o item tem menus secundários
    if (content) {
      setSelectedContent(content)
    } else {
      setSelectedContent(null)
      router.push(href)
    }
  }

  // Função para decidir a posição do menu
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
    <div className={clsx('relative', className)}>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex justify-center w-full">
          <MenuButton
            className={clsx(
              `inline-flex justify-center w-56 px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
              buttonClassName
            )}
          >
            {selectedIcon && <span className="mr-2">{selectedIcon}</span>}
            {selectedLabel}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 text-violet-200 hover:text-violet-100"
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
              getPositionClasses(),
              menuClassName
            )}
          >
            {items.map(({ label, href, content, icon }) => (
              <MenuItem key={label}>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={() => handleNavigation(href, label, content, icon)}
                    className={clsx(
                      'group flex items-center w-full px-4 py-2 text-sm',
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-200',
                      menuItemClassName
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
        <div className="mt-4 p-4 rounded-md shadow-md">{selectedContent}</div>
      )}
    </div>
  )
}

export default DropdownMenu
