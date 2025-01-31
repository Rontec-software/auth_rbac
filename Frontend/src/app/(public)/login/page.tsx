'use client';
import Input from '@/components/shared/Input';
import { useAuth } from '@/hooks/useAuth';

import { useSession } from '@/hooks/useSession';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const { saveToken } = useSession();

  async function handleLogin() {
    setEmailError('');
    setPasswordError('');
    const data = { email, password };

    if (!email) {
      return setEmailError('Campo obrigatório');
    }

    if (!password) {
      return setPasswordError('Campo obrigatório');
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${baseUrl}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const responseData = await res.json();
      saveToken(responseData.token);
      setIsAuthenticated(true);
      router.push('/usuario/listar');
    } catch (error) {
      alert(`Credenciais inválidas: ${error}`);
    }
  }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-[450px] bg-[#18181B] p-12 rounded-md">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/logo.png"
              width={150}
              height={150}
              alt="icone-escrever"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-[14px] text-white">
            <div>Entre com sua conta</div>
          </div>
          <Input
            name="Email"
            value={email}
            event={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
            iconAfter={
              <Image src="/email.svg" width={20} height={20} alt="email" />
            }
            type="text"
          />
          <Input
            name="Senha"
            iconAfter={
              <Image src="/eye.svg" width={20} height={20} alt="senha" />
            }
            type="password"
            value={password}
            event={(e) => setPassword(e.target.value)}
            errorMessage={passwordError}
          />
          <div className="flex justify-end items-end text-[12px] p-1 text-gray-400 cursor-pointer">
            <Link href={'http://localhost:3000/recuperarSenha'}>
              Esqueceu a senha?
            </Link>
          </div>
          <button
            onClick={handleLogin}
            className="bg-[#22C55E] text-white font-bold rounded-md p-2 mt-6 w-full"
          >
            Login
          </button>
          <div className="flex mt-6 justify-center items-center">
            <hr className="border-[#363638] flex-1 border-1" />
            <span className="pl-2 pr-2 text-[12px]">ou</span>
            <hr className="border-[#363638]  flex-1" />
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-[#DB4437] text-white font-bold rounded-full p-3 mt-6 w-12">
              G
            </button>
          </div>
          <div className="flex justify-center items-center text-[12px] m-1">
            Ainda não possui uma conta?
            <span className="text-green-600 pl-1">
              Cadastre-se
              <span className="cursor-pointer border-b-2 border-green-600 pl-1">
                <Link href={'http://localhost:3000/cadastrar'}>aqui</Link>
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center text-[10px] text-gray-500 m-1">
            ou faça login pelo Google clicando no botão G acima.
          </div>
        </div>
      </div>
    </div>
  );
}
