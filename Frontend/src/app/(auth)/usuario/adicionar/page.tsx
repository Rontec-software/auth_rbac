import DropdownMenu from '@/components/dropdown/DropdownMenu'
import InputIcon from '@/components/input/InputIcon'
import { IconCalendar, IconCalendarWeek, IconUser, IconUserCog, IconUserOff, IconUserPause, IconUserPlus, IconUserShield } from '@tabler/icons-react'

const perfilItems = [
  { label: 'Administrador', href: '#', icon: <IconUserShield />, content: null },
  { label: 'Gerente', href: '#', icon: <IconUserCog />, content: null },
  { label: 'Usuário', href: '#', icon: <IconUser />, content: null },
]

const diasTrabalhoItems = [
  { label: 'Segunda a Sexta', href: '#', icon: <IconCalendarWeek />, content: null },
  { label: 'Sábado', href: '#', icon: <IconCalendar />, content: null },
  { label: 'Domingo', href: '#', icon: <IconCalendar />, content: null },
]

const ativoItems = [
  { label: 'Ativo', href: '#', icon: <IconUserPlus />, content: null },
  { label: 'Inativo', href: '#', icon: <IconUserOff />, content: null },
  { label: 'Pendente', href: '#', icon: <IconUserPause />, content: null },
]

export default function CriarUsuario() {
  
  return (
    <div className="flex flex-col w-3/4">
      <div className="flex h-14 justify-center items-center bg-gray-800 rounded-tl-xl rounded-tr-xl">
        <span className="text-xl font-semibold">Criar Usuário</span>
      </div>
      <div className="flex flex-col pb-10 gap-5 bg-gray-950 items-center border border-t-0 border-gray-600/70">
        <div className="flex flex-col w-4/6 pt-14 gap-1">
          {/* <span className="text-lg font-semibold">Nome</span> */}
          <InputIcon
            icon={<IconUser />}
            iconPosition="left"
            placeholder="Digite aqui!"
            label="Nome"
            enableLabelTransition={true}
            className="text-white bg-gray-900 h-10"

          />
        </div>
        <div className="flex gap-14 pb-32">
          <DropdownMenu
            items={perfilItems}
            initialLabel='Perfil'
            containerClassName=''
            buttonClassName='w-full px-9'
            menuClassName='w-auto'
            menuItemClassName='whitespace-nowrap'

          />
          <DropdownMenu
            items={diasTrabalhoItems}
            initialLabel='Dias de Trabalho'
            containerClassName=''
            buttonClassName='w-full px-6'
            menuClassName='w-auto'
            menuItemClassName='whitespace-nowrap'
          />
          <DropdownMenu
            items={ativoItems}
            initialLabel='Ativo'
            containerClassName=''
            buttonClassName='w-full px-9'
            menuClassName='w-auto'
            menuItemClassName='whitespace-nowrap'
          />
        </div>
        <div className="flex gap-20">
          <button className='button w-auto hover:bg-gray-400 active:bg-emerald-800'>
            Salvar
          </button>
          <button className='button w-auto bg-blue-700 hover:bg-gray-400 active:bg-blue-900'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
