'use client';
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Input from "@/components/shared/Input";
import useApi from "@/data/hooks/useApi";

export default function Login() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const { httpPost } = useApi();

  async function handleRegister() {
    setNameError('')
    setEmailError('')
    setPasswordError('')
    const data = { name, email, password }
    const resp = await httpPost("/users", data)
    if (resp.success) {
      console.log('Deu bom!')
    } else {
      const errors = resp.errors
      console.log(errors)
      const indexErrorName = errors?.find((err) => err.field === 'name')
      if (indexErrorName) setNameError(indexErrorName.message)
      const indexErrorEmail = errors?.find((err) => err.field === 'email')
      if (indexErrorEmail) setEmailError(indexErrorEmail.message)
      const indexErrorPassword = errors?.find((err) => err.field === 'password')
      if (indexErrorPassword) setPasswordError(indexErrorPassword.message)
    }
  }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-[450px] bg-[#18181B] p-12 rounded-md">
          <div className="flex flex-col justify-center items-center text-[14px] text-white">
            <div>Cadastrar</div>
          </div>
          <Input
            name="Nome"
            icon={<Image src="/icon-write.svg" width={20} height={20} alt="icone-escrever" />}
            type="text"
            event={(e) => setName(e.target.value)}
          />
          <Input
            name="Email"
            icon={<Image src="/email.svg" width={20} height={20} alt="email" />}
            type="text"
            event={(e) => setEmail(e.target.value)}
          />
          <Input
            name="Senha"
            icon={<Image src="/padlock.svg" width={20} height={20} alt="senha" />}
            type="password"
            event={(e) => setPassword(e.target.value)}
          />
          <Input
            name="Senha"
            icon={<Image src="/padlock.svg" width={20} height={20} alt="senha-repetir" />}
            type="password"
            event={(e) => setPasswordRepeat(e.target.value)}
          />
          <div className="flex flex-col pt-5">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="phone"
              className="rounded-md border-2 border-black bg-black text-white h-[43px]"
            />
          </div>
          <button
            onClick={handleRegister}
            className="bg-[#22C55E] text-white font-bold rounded-md p-2 mt-6 w-full">
            Cadastre-se
          </button>
          <button
            className="text-[#A1A1AA] text-[15px] p-2 mt-2 w-full">
            Já possui conta?
            <span className="text-[#22C55E] pl-1">
              <Link href={'http://localhost:3000/login'}>
                Faça Login
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
