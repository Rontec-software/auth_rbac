'use client';
import { Chip } from '@/components/shared/chip/Chip';
import { DataTable } from '@/components/shared/data-table/DataTable';
import { IColumn } from '@/components/shared/data-table/DataTable.interface';
import { InputSearch } from '@/components/shared/input-search/InputSeach';
import Pagination from '@/components/shared/pagination/pagination';
import useApi from '@/hooks/useApi';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { FormEvent, useEffect, useState } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
  profilesGroup?: string;
  profiles: {
    profile: {
      id: string;
      name: string;
    }
  }[];
}

export default function User() {
  const { httpGet, httpDel } = useApi();
  const router = useRouter();
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
    { label: 'Permissões', key: 'profilesGroup', align: 'left' },
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
    {
      label: 'Ações',
      align: 'center',
      customRender: (row) => (
        <div className="flex items-center justify-center space-x-2">
          <Edit
            className="text-blue-500 cursor-pointer hover:text-blue-700 "
            onClick={() => router.push(`/usuario/form/${row.id}`)}
          />
          <Trash2
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => handleDeleteUser(row.id)}
          />
        </div>
      ),
    },
  ];

  const handleDeleteUser = async (id: number) => {
    const response = await httpDel(`users/${id}`);

    if (response.success) {
      alert('Usuário excluído com sucesso');
      fetchUsers();
    }
  };

  const fetchUsers = async (page = 1, limit = 10) => {
    const queryParams: Record<string, any> = { page, limit };
    if (search) {
      queryParams.name = search;
    }

    const response = await httpGet<{
      users: IUser[];
      total: number;
      page: number;
      totalPages: number;
    }>('users', {
      query: queryParams,
    });

    if (response.success && response.json) {
      const list = response?.json?.users ?? []
      const listProcess = list.map((user) => {
        const profilesGroup = user.profiles.map((prof) => prof.profile.name).join(', ');
        return { ...user, profilesGroup };
      })
      setData(listProcess);
      setPagination({
        total: response.json.total,
        page: response.json.page,
        totalPages: response.json.totalPages,
      });
    } else {
      console.error(response);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage);
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
      <Pagination
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
