interface IGetAllProfiles {
  id: string;
  name: string;
  description: string;
  active: true;
  createdAt: string;
}

export interface IGetAllProfilesWithPagination {
  page: number;
  profiles: IGetAllProfiles[];
  total: number;
  totalPages: number;
}

export interface ISubmitUsuarioForm {
  name: string;
  active: boolean;
  email: string;
  password: string;
  phoneNumber: string;
  profileIds: string[];
}

export interface IGetByIdUser {
  active: boolean;
  email: string;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  profiles: {
    profile: {
      id: string;
      name: string;
    };
  }[];
}
