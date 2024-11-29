'use client';
import { DataTable } from '@/components/shared/data-table/DataTable';
import { IColumn } from '@/components/shared/data-table/DataTable.interface';
import { InputSearch } from '@/components/shared/input-search/InputSeach';
import { FormEvent, useState } from 'react';

interface IUser {
  name: string;
  email: string;
  ativo: boolean;
}
export default function User() {
  const [search, setSearch] = useState<string>('');
  const handleSearchUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchUser = formData.get('search');

    if (typeof searchUser == 'string') {
      setSearch(searchUser);
    }
  };

  const handleReset = () => {
    setSearch('');
    console.log(search);
  };

  const columns: IColumn<IUser>[] = [
    { label: 'Nome', key: 'name', align: 'left' },
    { label: 'Email', key: 'email', align: 'left' },
  ];

  const data = [
    {
      name: 'Usuário 1',
      email: 'email1@gmail',
      profile: 'Perfil 1',
      ativo: true,
    },
    {
      name: 'Usuário 2',
      email: 'email2@gmail',
      profile: 'Perfil 2',
      ativo: false,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-center rounded-lg w-full pb-4">
        <InputSearch
          label="Pesquisar Usuários"
          name="search"
          placeholder="Buscar Usuários"
          handleSearch={handleSearchUser}
          handleReset={handleReset}
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
