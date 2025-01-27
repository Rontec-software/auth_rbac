'use client';
import { IconEyeOff, IconEye } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useApi from '@/hooks/useApi';

export default function RedefinirSenha() {
  const searchParams = useSearchParams()

  const [newPass, setNewPass] = useState('');
  const [newPassRepeat, setNewPassRepeat] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [msgError, setMsgError] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const { httpPost } = useApi();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    setToken(token || '');
    setEmail(email || '');
  }, [searchParams])

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPasswordRepeat = () => setShowPasswordRepeat(!showPasswordRepeat);

  async function handle() {
    if (!newPass && !newPassRepeat) {
      setMsgError('Os campos são obrigatórios');
      return;
    }

    if (newPass !== newPassRepeat) {
      setMsgError('As senhas não coincidem');
      return;
    }

    const data = { email, token, password: newPass }
    const resp = await httpPost('/auth/reset-password', data);
    if (resp.success) {
      setMsgSuccess('Senha redefinida com sucesso');
    } else {
      setMsgError('Erro ao redefinir senha. Favor entrar em contato com o suporte.');
      const errors = resp.errors;
      console.log(errors);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-8 rounded-xl bg-container py-10">
        <span className="text-xl text-center font-semibold xs:text-xl">
          Redefinir senha
        </span>
        <div className="flex flex-col gap-2 px-10 max-xs:px-5">
          <span className="text-s font-light">Nova senha</span>
          <div className="input-container">
            <input
              onChange={(e) => setNewPass(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              name="new-password"
              id="new-password"
              placeholder="Digite sua nova senha"
            />
            <div className="icon-container-eye cursor-pointer" onClick={toggleShowPassword}>
              {showPassword
                ? <IconEyeOff stroke={0.5} size={24} />
                : <IconEye stroke={0.5} size={24} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-10 max-xs:px-5">
          <span className="text-s font-light">Repetir nova senha</span>
          <div className="input-container">
            <input
              onChange={(e) => setNewPassRepeat(e.target.value)}
              type={showPasswordRepeat ? 'text' : 'password'}
              name="repeat-new-password"
              id="repeat-new-password"
              placeholder="Digite a nova senha novamente"
            />
            <div className="icon-container-eye" onClick={toggleShowPasswordRepeat}>
              {showPasswordRepeat
                ? <IconEyeOff className="cursor-pointer" stroke={0.5} size={24} />
                : <IconEye className="cursor-pointer" stroke={0.5} size={24} />}
            </div>
          </div>
        </div>
        <div className="flex text-[12px]">
          {msgError && <span className="text-red-500">{msgError}</span>}
          {msgSuccess && <span className="text-green-500">{msgSuccess}</span>}
        </div>
        <button
          onClick={handle}
          className="button"
          type="button">
          Enviar
        </button>
      </div>
    </div>
  )
}
