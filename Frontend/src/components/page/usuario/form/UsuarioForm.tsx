'use client';
import { CustomCheckBox } from '@/components/input/Checkbox';
import { Option } from '@/components/input/Combobox';
import ComboboxMultiple from '@/components/input/ComboboxMultiple';
import FloatingInput from '@/components/input/FloatingInput';
import Input from '@/components/shared/Input';
import InputPhone from '@/components/shared/InputPhone';
import { useApi } from '@/data/hooks/useApi';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const perfilItems: Option[] = [
  {
    label: 'Administrador',
    value: 1,
  },
  { label: 'Gerente', value: 2 },
  { label: 'Usuário', value: 3 },
  { label: 'Ativo', value: 4 },
  { label: 'Inativo', value: 5 },
];

export const UsuarioForm = ({}) => {
  const [nome, setNome] = useState('');
  const [perfil, setPerfil] = useState<Option[]>([]);
  const [ativo, setAtivo] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [email, setEmail] = useState('');
  const { post } = useApi();

  const submitForm = async () => {
    const data = {};
    const response = await post('/users/register', {
      name: nome,
      active: ativo,
      email,
      password,
      phoneNumber,
      profileIds: perfil.map((p) => p.value),
    });
  };

  return (
    <div className="flex flex-col w-3/4">
      <div className="flex h-14 justify-center items-center bg-gray-800 rounded-tl-xl rounded-tr-xl">
        <span className="text-xl font-semibold">Criar Usuário</span>
      </div>
      <div className="flex flex-1 flex-col pb-10 gap-5 bg-gray-950 items-center border border-t-0 border-gray-600/70">
        <form className="flex flex-col bg-inherit w-4/6 pt-14 gap-1">
          <FloatingInput
            label="Nome"
            type={'text'}
            icon={<User2 size={22} />}
            iconPosition="left"
            name="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </form>
        <div className="flex gap-5 pb-32">
          <ComboboxMultiple
            options={perfilItems}
            placeholder="Selecione o Perfil"
            defaultValue={perfil}
            onChange={setPerfil}
          />
          <CustomCheckBox
            name="ativo"
            label="Ativo"
            checked={ativo}
            onChange={(val) => setAtivo(val)}
          />
        </div>
        <>
          <Input
            name="Email"
            iconBefore={
              <Image src="/email.svg" width={20} height={20} alt="email" />
            }
            type="text"
            value={email}
            event={(e) => setEmail(e.target.value)}
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
          />
          <div className="flex flex-col pt-5">
            <InputPhone phone={phoneNumber} setPhone={setPhoneNumber} />
          </div>
        </>
        <div className="flex gap-20">
          <button
            className="button w-auto hover:bg-gray-400 active:bg-emerald-800"
            onClick={submitForm}
          >
            Salvar
          </button>
          <button className="button w-auto bg-blue-700 hover:bg-gray-400 active:bg-blue-900">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
