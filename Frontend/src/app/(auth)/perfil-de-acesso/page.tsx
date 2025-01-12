'use client';
import { Chip } from '@/components/shared/chip/Chip';
import { DataTable } from '@/components/shared/data-table/DataTable';
import { IColumn } from '@/components/shared/data-table/DataTable.interface';
import { InputSearch } from '@/components/shared/input-search/InputSeach';
import Pagination from '@/components/shared/pagination/pagination';
import useApi from '@/data/hooks/useApi';
import { FormEvent, useState } from 'react';

interface IPermissionProfile {
  id: number;
  nome: string;
  descricao?: string;
  dataCriacao?: string;
  ativo: boolean;
  permissoes?: string[];
}
export default function PermissionsProfile() {
  const [search, setSearch] = useState<string>('');
  const {} = useApi<IPermissionProfile>();
  const handleSearcPermissionProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchPermissionProfile = formData.get('search');

    if (typeof searchPermissionProfile == 'string') {
      setSearch(searchPermissionProfile);
    }
  };

  const handleReset = () => {
    setSearch('');
    console.log(search);
  };

  const columns: IColumn<IPermissionProfile>[] = [
    { label: 'Nome', key: 'nome', align: 'left' },
    { label: 'Descrição', key: 'descricao', align: 'left' },
    {
      label: 'Status',
      key: 'ativo',
      align: 'center',
      customRender: (row) => (
        <Chip
          label={row.ativo ? 'Ativo' : 'Inativo'}
          color={row.ativo ? 'bg-green-500' : 'bg-gray-500'}
        />
      ),
    },
  ];

  const data: IPermissionProfile[] = [
    {
      id: 1,
      nome: 'Pefil 1',
      descricao: 'Descrição do Perfil 1',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Perfil 2',
      descricao: 'Descrição do Perfil 2',
      ativo: false,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-center rounded-lg w-full pb-4">
        <InputSearch
          label="Pesquisar Perfil"
          name="search"
          placeholder="Digite o nome do perfil"
          handleSearch={handleSearcPermissionProfile}
          handleReset={handleReset}
        />
      </div>

      <DataTable columns={columns} data={data} />

      <Pagination totalPages={10} onPageChange={(page) => console.log(page)} />
    </div>
  );
}
