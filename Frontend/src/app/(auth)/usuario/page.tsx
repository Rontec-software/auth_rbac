'use client';
import { Chip } from '@/components/shared/chip/Chip';
import { DataTable } from '@/components/shared/data-table/DataTable';
import { IColumn } from '@/components/shared/data-table/DataTable.interface';
import { InputSearch } from '@/components/shared/input-search/InputSeach';
import Pagination from '@/components/shared/pagination/pagination';
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
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
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

  const fetchUsers = async (page = 1, limit = 10) => {
    const queryParams: Record<string, any> = { page, limit };
    if (search) {
      queryParams.name = search;
    }

    const response = await get<{
      users: IUser[];
      total: number;
      page: number;
      totalPages: number;
    }>('/users', {
      query: queryParams,
    });

    if (response.success) {
      setData(response.json.users);
      setPagination({
        total: response.json.total,
        page: response.json.page,
        totalPages: response.json.totalPages,
      });
    } else {
      console.log(response);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <Pagination
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
