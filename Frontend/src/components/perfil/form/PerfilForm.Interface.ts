export interface IGetAllPermissions {
  id: string;
  name: string;
  description: string;
  active: true;
  createdAt: string;
}

export interface ISubmitProfileForm {
  name: string;
  description: string;
  active: boolean;
  permissionsIds: string[];
}

export interface IGetByIdProfile {
  id: string;
  name: string;
  description: string;
  active: boolean;
  permissions: {
    permission: {
      id: string;
      name: string;
      active: boolean;
    };
  }[];
}
