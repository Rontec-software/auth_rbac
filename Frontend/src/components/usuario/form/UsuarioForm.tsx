'use client';
import { CustomCheckBox } from '@/components/input/Checkbox';
import { Option } from '@/components/input/Combobox';
import ComboboxMultiple from '@/components/input/ComboboxMultiple';
import Input from '@/components/shared/Input';
import InputPhone from '@/components/shared/InputPhone';

import { User2 } from 'lucide-react';
import Image from 'next/image';

import useApi from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IGetAllProfilesWithPagination,
  IGetByIdUser,
  ISubmitUsuarioForm,
} from './UsuarioForm.Interface';

export const UsuarioForm = ({ edit }: { edit?: string }) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [profile, setProfile] = useState<Option[]>([]);
  const [active, setActive] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [profileOptions, setProfileOptions] = useState<Option[]>([]);

  const [loading, setLoading] = useState(true);
  const { httpPost, httpPatch, httpGet } = useApi();

  async function getAllProfiles() {
    const response = await httpGet<IGetAllProfilesWithPagination>('profiles');

    if (response.status == 200 && response.json) {
      const options = response.json?.profiles?.map((res) => ({
        label: res.name,
        value: res.id,
      }));

      setProfileOptions(options || []);
    }
  }

  async function getById() {
    const response = await httpGet<IGetByIdUser>(`users/${edit}`);

    if (response.status == 200 && response.json) {
      const profile = response.json.profiles.flatMap((p) => ({
        label: p.profile.name,
        value: p.profile.id,
      }));

      setName(response.json.name || '');
      setActive(response.json.active);
      setEmail(response.json.email || '');
      setPhoneNumber(response.json.phoneNumber || '');
      setPassword(response.json.password || '');
      setProfile(profile);
    }
  }

  const submitForm = async () => {
    if (password !== passwordRepeat) {
      alert('As senhas não conferem');
      return;
    }
    const data: ISubmitUsuarioForm = {
      name,
      active,
      email,
      password,
      phoneNumber,
      profileIds: profile.map((p) => p.value) as string[],
    };

    let response;

    if (edit) {
      response = await httpPatch<any, ISubmitUsuarioForm>(`users/${edit}`, data);
    } else {
      response = await httpPost<any, ISubmitUsuarioForm>('users/register', data);
    }
    if ((response?.errors && response?.errors?.length > 0) || !response?.status)
      return alert(response.errors);
    alert(`Usuário ${edit ? 'atualizado' : 'criado'} com sucesso`);
    router.push('/usuario/listar');
  };

  async function getValues() {
    if (edit) await getById();
    await getAllProfiles();
    setLoading(false);
  }

  useEffect(() => {
    getValues();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-6 bg-gray-950 rounded-lg shadow-md">
      <div className="text-center text-white text-2xl font-bold bg-gray-800 py-4 rounded-t-lg border-b border-gray-700">
        {edit ? 'Editar' : 'Criar'} Usuário
      </div>

      <div className="flex flex-col gap-y-6 mt-6 md:flex-row md:gap-x-6">
        <div className="flex-1">
          <Input
            name="Name"
            iconBefore={<User2 size={22} />}
            value={name}
            event={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex-1">
          <Input
            name="Email"
            iconBefore={
              <Image src="/email.svg" width={20} height={20} alt="email" />
            }
            type="text"
            value={email}
            event={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-6 mt-6 md:flex-row md:gap-x-6">
        <div className="flex-1">
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
        </div>
        <div className="flex-1">
          <Input
            name="Confirmar Senha"
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
        </div>
      </div>

      <div className="flex flex-col gap-y-6 mt-8 md:flex-row md:gap-x-6">
        <div className="flex-1">
          <ComboboxMultiple
            options={profileOptions || []}
            placeholder="Selecione o Perfil"
            value={profile}
            onChange={setProfile}
          />
        </div>
        <div className="flex-1">
          <label className="text-[14px]">Telefone</label>
          <InputPhone phone={phoneNumber} setPhone={setPhoneNumber} />
        </div>
      </div>

      <div className="flex-1 gap-y-6 mt-6">
        <CustomCheckBox
          name="ativo"
          label="Ativo"
          checked={active}
          onChange={(val) => setActive(val)}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="w-full px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg transition duration-300"
          onClick={submitForm}
        >
          Salvar
        </button>
        <button
          className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition duration-300"
          onClick={() => router.push('/usuario/listar')}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
