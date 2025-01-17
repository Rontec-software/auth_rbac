'use client';
import { Chip } from '@/components/shared/chip/Chip';
import { DataTable } from '@/components/shared/data-table/DataTable';
import { IColumn } from '@/components/shared/data-table/DataTable.interface';
import { InputSearch } from '@/components/shared/input-search/InputSeach';
import { useApi } from '@/data/hooks/useApi';

import { FormEvent, useEffect, useState } from 'react';

interface IUser {
  name: string;
  email: string;
  active: boolean;
}

export default function User() {
  const { get } = useApi();
  const [search, setSearch] = useState<string | null>(null);
  const [data, setData] = useState<IUser[]>([]);
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
    {
      label: 'Status',
      key: 'active',
      align: 'center',
      customRender: (row) => (
        <Chip
          label={row.active ? 'Ativo' : 'Inativo'}
          color={row.active ? 'bg-green-500' : 'bg-gray-500'}
        />
      ),
    },
  ];

  /*   const data = [
    {
      name: 'Usuário 1',
      email: 'email1@gmail',
      profile: 'Perfil 1',
      active: true,
    },
    {
      name: 'Usuário 2',
      email: 'email2@gmail',
      profile: 'Perfil 2',
      active: false,
    },
  ];
 */
  const fetchUsers = async () => {
    const queryParams = {};
    const response = await get<IUser[]>('/auth/users', {
      query: { ...queryParams, active: true },
    });
    if (response.success) {
      setData(response.json);
      console.log(response.json);
    } else {
      console.error(response.errors);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  return (
    <div className="w-full h-full p-4">
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
