'use client';
import Input from '@/components/shared/Input';
import InputPhone from '@/components/shared/InputPhone';
import useApi from '@/data/hooks/useApi';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Cadastrar() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { httpPost } = useApi();

  async function handleRegister() {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPasswordRepeatError('');
    const data = { name, email, password, phoneNumber: phone };
    if(name.trim().length < 3) {
      return setNameError('Digite seu nome completo.')
    }
    const nomeParts = name.trim().split(' ')
    if(nomeParts.length < 2){
      return setNameError('Nome Incompleto, digite o sobrenome.')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)) {
      return setEmailError('Digite um email válido.')
    }

    // const senhaForteRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // if(senhaForte.test(password)) {
    //   return setPasswordError('Digite uma senha forte!')
    // }
    if(password.length < 6) {
      return setEmailError('A senha deve conter no mínimo 6 caracteres')
    }
    if (password !== passwordRepeat) {
      return setPasswordRepeatError('As senhas não são iguais');
    }

    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
    if(phoneRegex.test(phone)) {
      return setPhoneError('Número de telefone inválido.')
    }

    const resp = await httpPost('/users/register', data);
    if (resp.success) {
      console.log('Deu bom, usuário cadastrado com sucesso!');
    } else {
      const errors = resp.errors;
      console.log(errors);
      const indexErrorName = errors?.find((err) => err.field === 'name');
      if (indexErrorName) setNameError(indexErrorName.message);

      const indexErrorEmail = errors?.find((err) => err.field === 'email');
      if (indexErrorEmail) setEmailError(indexErrorEmail.message);

      const indexErrorPassword = errors?.find(
        (err) => err.field === 'password'
      );
      if (indexErrorPassword) setPasswordError(indexErrorPassword.message);
      
      const indexErrorPhone = errors?.find((err) => err.field === 'phoneNumber')
      if(indexErrorPhone) setPhoneError(indexErrorPhone.message)
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
            iconBefore={
              <Image
                src="/icon-write.svg"
                width={20}
                height={20}
                alt="icone-escrever"
              />
            }
            type="text"
            value={name}
            event={(e) => setName(e.target.value)}
            errorMessage={nameError}
          />
          <Input
            name="Email"
            iconBefore={
              <Image src="/email.svg" width={20} height={20} alt="email" />
            }
            type="text"
            value={email}
            event={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
          />
          <Input
            name="Senha"
            iconBefore={
              <Image src="/padlock.svg" width={20} height={20} alt="senha" />
            }
            iconAfter={
              <Image src="/eye.svg" width={20} height={20} alt="senha" />
            }
            type="password"
            value={password}
            event={(e) => setPassword(e.target.value)}
            errorMessage={passwordError}
          />
          <Input
            name="Senha"
            iconBefore={
              <Image
                src="/padlock.svg"
                width={20}
                height={20}
                alt="senha-repetir"
              />
            }
            type="password"
            value={passwordRepeat}
            event={(e) => setPasswordRepeat(e.target.value)}
            errorMessage={passwordRepeatError}
          />
          <div className="flex flex-col pt-5">
            <InputPhone phone={phone} setPhone={setPhone} />
            <span>{phoneError}</span>
          </div>
          <button
            onClick={handleRegister}
            className="bg-[#22C55E] text-white font-bold rounded-md p-2 mt-6 w-full"
          >
            Cadastre-se
          </button>
          <button className="text-[#A1A1AA] text-[15px] p-2 mt-2 w-full">
            Já possui conta?
            <span className="text-[#22C55E] pl-1">
              <Link href={'http://localhost:3000/login'}>Faça Login</Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
