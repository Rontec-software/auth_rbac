'use client';
import { CustomCheckBox } from '@/components/input/Checkbox';
import { Option } from '@/components/input/Combobox';
import ComboboxMultiple from '@/components/input/ComboboxMultiple';
import Input from '@/components/shared/Input';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IGetAllPermissions,
  IGetByIdProfile,
  ISubmitProfileForm,
} from './PerfilForm.Interface';

export const PerfilForm = ({ edit }: { edit?: string }) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<Option[]>([]);
  const [active, setActive] = useState(true);

  const [permissionOptions, setPermissionOptions] = useState<Option[]>([]);

  const [loading, setLoading] = useState(true);
  const { httpPost, httpPut, httpGet } = useApi();

  async function getAllProfiles() {
    const response = await httpGet<IGetAllPermissions[]>('permissions');

    if (response.status == 200 && response.json) {
      const options = response.json?.map((res) => ({
        label: res.name,
        value: res.id,
      }));

      setPermissionOptions(options || []);
    }
  }

  async function getById() {
    const response = await httpGet<IGetByIdProfile>(`profiles/${edit}`);

    if (response.status == 200 && response.json) {
      const respPermissions = response.json.permissions.flatMap((p) => ({
        label: p.permission.name,
        value: p.permission.id,
      }));

      setName(response.json.name || '');
      setDescription(response.json.description || '');
      setActive(response.json.active);
      setPermissions(respPermissions);
    }
  }

  const submitForm = async () => {
    const data: ISubmitProfileForm = {
      name,
      description,
      active,
      permissionsIds: permissions.map((p) => p.value) as string[],
    };

    let response;

    if (edit) {
      response = await httpPut<any, ISubmitProfileForm>(`profiles/${edit}`, data);
    } else {
      response = await httpPost<any, ISubmitProfileForm>('profiles', data);
    }
    if ((response?.errors && response?.errors?.length > 0) || !response?.status)
      return alert(response.errors);
    alert(`Perfil ${edit ? 'atualizado' : 'criado'} com sucesso`);
    router.push('/perfil-de-acesso/listar');
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
        {edit ? 'Editar' : 'Criar'} Perfil
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
            name="Descrição"
            iconBefore={
              <Image src="/email.svg" width={20} height={20} alt="descrição" />
            }
            type="text"
            value={description}
            event={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-6 mt-8 md:flex-row md:gap-x-6">
        <div className="flex-1">
          <ComboboxMultiple
            options={permissionOptions || []}
            placeholder="Selecione a Permissão"
            value={permissions}
            onChange={setPermissions}
          />
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
          onClick={() => router.push('/perfil-de-acesso/listar')}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
