import { IconMail } from '@tabler/icons-react'

export default function RecuperarSenha() {
  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-8 rounded-xl bg-container py-10">
        <span className="text-xl text-center font-semibold xs:text-xl">
          Solicitar troca de senha
        </span>
        <div className="flex flex-col gap-2 px-10 max-xs:px-5">
          <span className="text-s font-light">E-mail</span>
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
            />
            <div className="icon-container">
              <IconMail stroke={0.5} size={24} />
            </div>
          </div>
        </div>
        <button className="button" type="button">
          Enviar
        </button>
      </div>
    </div>
  )
}
