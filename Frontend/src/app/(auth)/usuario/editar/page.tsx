'use client';
import { User2 } from 'lucide-react';
import FloatingInput from '@/components/input/FloatingInput';
import { ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from '@/hooks/useSession';

export default function EditarUsuario() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { getToken } = useSession();

  useEffect(() => {

    fetch(`${baseUrl}users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || 'Erro ao fazer login');
          });
        }
        return res.json();
      })
      .then((responseData) => {
        setName(responseData.name);
      })
      .catch((error) => {
        alert(`Credenciais inválidas: ${error}`);
      });
  }, []);

  async function handleSave() {
    setNameError('');
    setPasswordError('');
    const data = { name, password };

    if (name) {
      fetch(`${baseUrl}users/rename`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      })
        .then((_) => {
          alert('Usuário atualizado com sucesso');
        })
        .catch((error) => {
          alert(`Credenciais inválidas: ${error}`);
        });
    }

    if (password) {
      if (password !== passwordRepeat) {
        return setPasswordRepeatError('As senhas não coincidem');
      }

      fetch(`${baseUrl}users/rename`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      })
        .then((_) => {
          alert('Usuário atualizado com sucesso');
        })
        .catch((error) => {
          alert(`Credenciais inválidas: ${error}`);
        }).finally(() => {
          setPassword('')
          setPasswordRepeat('')
          setBtnDisable(true)
        })
    }
  }

  function enableBtn() {
    if (name && password && passwordRepeat) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value)
              enableBtn()
            }}
          />
          <FloatingInput
            label="Nova Senha"
            type={'password'}
            icon={<Image src="/eye.svg" width={20} height={20} alt="senha" />}
            iconPosition="left"
            name={'senha'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
              enableBtn()
            }}
          />
          <FloatingInput
            label="Repetir Senha"
            type={'password'}
            icon={<Image src="/eye.svg" width={20} height={20} alt="senha" />}
            iconPosition="left"
            name={'senha'}
            value={passwordRepeat}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPasswordRepeat(e.target.value)
              enableBtn()
            }}
          />
        </form>
        <div className="flex gap-20">
          {btnDisable
            ? (
              <button
                onClick={() => { }}
                className='button w-auto hover:bg-gray-600 bg-gray-600'>
                Salvar
              </button>
            )
            : (
              <button
                onClick={handleSave}
                className='button w-auto hover:bg-gray-400 active:bg-emerald-800'>
                Salvar
              </button>
            )}
        </div>
      </div>
    </div>
  )
}
