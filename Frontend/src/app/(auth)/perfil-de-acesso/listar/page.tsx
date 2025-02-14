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

interface IPermission {
  id: string;
  name: string;
  descrition: string;
  active: boolean;
  createdAt: string;
}

interface IProfilePermission {
  profileId: string;
  permissionId: string;
  permission: IPermission;
}

interface IProfile {
  id: number;
  name: string;
  permissions: IProfilePermission[];
  permissionsGroup?: string;
  active: boolean;
}

export default function Page() {
  const { httpGet, httpDel } = useApi();
  const router = useRouter();
  const [search, setSearch] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [dataList, setDataList] = useState<IProfile[]>([]);

  const handleSearchProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchProfile = formData.get('search');

    if (typeof searchProfile == 'string') {
      setSearch(searchProfile);
    }
  };

  const handleReset = () => {
    setSearch('');
  };

  const columns: IColumn<IProfile>[] = [
    { label: 'Nome do perfil', key: 'name', align: 'left' },
    { label: 'Permissões', key: 'permissionsGroup', align: 'left' },
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
            onClick={() => router.push(`/perfil-de-acesso/form/${row.id}`)}
          />
          <Trash2
            className="text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => handleDeleteProfile(row.id)}
          />
        </div>
      ),
    },
  ];

  const handleDeleteProfile = async (id: number) => {
    const response = await httpDel(`profiles/${id}`);

    if (response.success) {
      alert('Perfil excluído com sucesso');
      fetchProfiles();
    }
  };

  const fetchProfiles = async (page = 1, limit = 10) => {
    const queryParams: Record<string, any> = { page, limit };
    if (search) {
      queryParams.name = search;
    }

    const response = await httpGet<{
      profiles: IProfile[];
      total?: number;
      page?: number;
      totalPages: number;
    }>('profiles', {
      query: queryParams,
    });

    if (response.success) {
      const list = response?.json?.profiles ?? []
      const listProcess = list.map((profile) => {
        const permissionsGroup = profile.permissions.map((perm) => perm.permission.name).join(', ');
        return { ...profile, permissionsGroup };
      })
      setDataList(listProcess);
      setPagination({
        total: response?.json?.total ?? 0,
        page: response?.json?.page ?? 0,
        totalPages: response?.json?.totalPages ?? 0,
      });
    } else {
      console.error(response);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchProfiles(newPage);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-center rounded-lg w-full pb-4">
        <InputSearch
          label="Pesquisar Perfil"
          name="search"
          placeholder="Buscar Perfis"
          handleSearch={handleSearchProfile}
          handleReset={handleReset}
        />
      </div>

      <DataTable columns={columns} data={dataList} />
      <Pagination
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
