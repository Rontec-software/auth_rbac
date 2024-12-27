import { IconCalendar, IconCalendarWeek, IconUser, IconUserCog, IconUserOff, IconUserPause, IconUserPlus, IconUserShield } from '@tabler/icons-react'
import { User2 } from 'lucide-react'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import FloatingInput from '@/components/input/FloatingInput'

const perfilItems = [
  { label: 'Administrador', href: '#', icon: <IconUserShield size={18} />, content: null },
  { label: 'Gerente', href: '#', icon: <IconUserCog size={18} />, content: null },
  { label: 'Usuário', href: '#', icon: <IconUser size={18} />, content: null },
]

const diasTrabalhoItems = [
  { label: 'Segunda a Sexta', href: '#', icon: <IconCalendarWeek size={18} />, content: null },
  { label: 'Sábado', href: '#', icon: <IconCalendar size={18} />, content: null },
  { label: 'Domingo', href: '#', icon: <IconCalendar size={18} />, content: null },
]

const ativoItems = [
  { label: 'Ativo', href: '#', icon: <IconUserPlus size={18} />, content: null },
  { label: 'Inativo', href: '#', icon: <IconUserOff size={18} />, content: null },
  { label: 'Pendente', href: '#', icon: <IconUserPause size={18} />, content: null },
]

export default function CriarUsuario() {
  
  return (
    <div className="flex flex-wrap flex-col w-11/12 md:w-3/4 px-3 mx-auto my-10">
      <div className="flex py-3 md:h-14 justify-center items-center bg-gray-800 rounded-tl-xl rounded-tr-xl">
        <span className="text-xl font-semibold">Criar Usuário</span>
      </div>
      <div className="flex flex-1 flex-col pb-10 gap-5 bg-gray-950 items-center border border-t-0 border-gray-600/70">
        <form className="flex flex-col bg-inherit w-11/12 md:w-4/6 pt-8 md:pt-14">
          <FloatingInput
            label="Nome" 
            type={'text'}
            inputFocusBorderDark={'dark:focus:border-cyan-500'}
            iconFocusDark={'dark:focus:text-cyan-500'}
            labelFocusDark={'dark:focus:text-cyan-500'}
            icon={<User2 size={22} />}
            iconPosition="left"
          />
        </form>
        <div className="flex flex-col items-center gap-5 md:pb-32 md:flex-nowrap">
          <DropdownMenu
            items={perfilItems}
            initialLabel='Perfil'
            containerClassName=''
            buttonClassName='w-full px-20 md:px-6'
            menuClassName='w-fit'
            menuItemClassName='whitespace-nowrap'

          />
          <DropdownMenu
            items={diasTrabalhoItems}
            initialLabel='Dias de Trabalho'
            containerClassName=''
            buttonClassName='w-full px-10 md:px-6'
            menuClassName='w-fit'
            menuItemClassName='whitespace-nowrap'
          />
          <DropdownMenu
            items={ativoItems}
            initialLabel='Ativo'
            containerClassName=''
            buttonClassName='w-full px-20 md:px-6'
            menuClassName='w-fit'
            menuItemClassName='whitespace-nowrap'
          />
        </div>
        <div className="flex flex-1 justify-around px-4 gap-4 md:gap-20">
          <button className='button w-1/2 md:w-auto hover:bg-gray-400 active:bg-emerald-800'>
            Salvar
          </button>
          <button className='button w-1/2 md:w-auto bg-blue-700 hover:bg-gray-400 active:bg-blue-900'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
