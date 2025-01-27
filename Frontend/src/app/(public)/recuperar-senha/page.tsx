'use client';
import useApi from '@/hooks/useApi';
import { IconMail } from '@tabler/icons-react';
import { useState } from 'react';

export default function RecuperarSenha() {

  const [email, setEmail] = useState('');
  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const { httpPost } = useApi();

  async function handleSubmit() {

    if (!email) {
      setMsgError('O campo email é obrigatório')
      return
    }

    const data = { email }
    const resp = await httpPost('/auth/recover-password', data);
    if (resp.success) {
      setMsgSuccess('E-mail enviado com sucesso. Verifique sua caixa de entrada.');
    } else {
      setMsgError('Erro ao enviar e-mail. Favor entrar em contato com o suporte.');
      const errors = resp.errors;
      console.log(errors);
    }
  }

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
              onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex text-[12px]">
          {msgError && <span className="text-red-500">{msgError}</span>}
          {msgSuccess && <span className="text-green-500">{msgSuccess}</span>}
        </div>
        <button
          onClick={handleSubmit}
          className="button"
          type="button">
          Enviar
        </button>
      </div>
    </div>
  )
}
