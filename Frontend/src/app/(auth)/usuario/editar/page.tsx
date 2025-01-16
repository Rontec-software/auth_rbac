'use client';
import { User2 } from 'lucide-react';
import FloatingInput from '@/components/input/FloatingInput';
import { ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { useState } from 'react';

export default function EditarUsuario() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setName('');
    setPassword('');
  }, []);

  async function handleSave() {
    setNameError('');
    setPasswordError('');
    const data = { name, password };
    if (!name) {
      return setNameError('Campo obrigatório');
    }
    if (!password) {
      return setPasswordError('Campo obrigatório');
    }
    console.log('Usuário salvo!');
  }

  return (
    <div className="flex flex-col w-3/4">
      <div className="flex h-14 justify-center items-center bg-gray-800 rounded-tl-xl rounded-tr-xl">
        <span className="text-xl font-semibold">Editar Usuário</span>
      </div>
      <div className="flex flex-1 flex-col pb-10 gap-5 bg-gray-950 items-center border border-t-0 border-gray-600/70">
        <form className="flex flex-col bg-inherit w-4/6 pt-14 gap-1">
          <FloatingInput
            label="Nome"
            type={'text'}
            icon={<User2 size={22} />}
            iconPosition="left"
            name={'nome'}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <FloatingInput
            label="Senha"
            type={'password'}
            icon={<Image src="/eye.svg" width={20} height={20} alt="senha" />}
            iconPosition="left"
            name={'senha'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </form>
        <div className="flex gap-20">
          <button
            onClick={handleSave}
            className='button w-auto hover:bg-gray-400 active:bg-emerald-800'>
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
