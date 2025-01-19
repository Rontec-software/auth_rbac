'use client';
import CustomCombobox, { Option } from '@/components/input/Combobox';
import FloatingInput from '@/components/input/FloatingInput';
import { useApi } from '@/data/hooks/useApi';
import { User2 } from 'lucide-react';
import { useState } from 'react';

const perfilItems: Option[] = [
  {
    label: 'Administrador',
    value: 1,
  },
  { label: 'Gerente', value: 2 },
  { label: 'Usuário', value: 3 },
];

const diasTrabalhoItems: Option[] = [
  {
    label: 'Segunda a Sexta',
    value: 1,
  },
  { label: 'Sábado', value: 2 },
  { label: 'Domingo', value: 3 },
];

const ativoItems: Option[] = [
  { label: 'Ativo', value: 1 },
  { label: 'Inativo', value: 2 },
];

export const UsuarioForm = ({}) => {
  const [nome, setNome] = useState('');
  const [diasDeTrabalho, setDiasDeTrabalho] = useState<Option | null>(null);
  const [perfil, setPerfil] = useState<Option | null>(null);
  const [ativo, setAtivo] = useState<Option | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const { post } = useApi();

  const submitForm = async () => {
    const data = {};
    const response = await post('/users', {
      name: nome,

      active: ativo?.value === 1 ? true : false,
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
          <CustomCombobox
            options={perfilItems}
            placeholder="Selecione o Perfil"
            value={perfil}
            onChange={(val) => setPerfil(val)}
          />
          <CustomCombobox
            options={diasTrabalhoItems}
            placeholder="Dias de Trabalho"
            value={diasDeTrabalho}
            onChange={(val) => setDiasDeTrabalho(val)}
          />
          <CustomCombobox
            options={ativoItems}
            placeholder="Ativo"
            value={ativo}
            onChange={(val) => setAtivo(val)}
          />
        </div>
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
