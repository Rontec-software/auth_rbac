export interface IGetAllProfiles {
  id: string;
  name: string;
  description: string;
  active: true;
  createdAt: string;
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
