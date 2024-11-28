import { IconMail } from '@tabler/icons-react'

export default function RecuperarSenha() {
  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center h-screen">
      <div className="flex rounded-2xl bg-gradient-to-tr from-emerald-200 to-cyan-600 p-1 m-6">
        <div className="flex flex-col gap-8 rounded-xl bg-gray-950 p-10 xs:px-5">
          <span className="text-2xl text-center font-semibold uppercase xs:text-xl">
            Solicitar troca de senha
          </span>
          <div className="flex flex-col gap-2">
            <span className="text-md font-light">E-mail</span>
            <div className="input-email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu e-mail"
              />
              <div className="icon-container">
                <IconMail stroke={0.5} size={36} />
              </div>
            </div>
          </div>
          <button className="button uppercase" type="button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
