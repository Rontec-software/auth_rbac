export interface ICreateProfile {
  name: string;
  description: string;
  active: boolean;
  permissionsIds?: number[];
}

export interface IUpdateProfile {
  id: string;
  name: string;
  description: string;
  active: boolean;
  permissionsIds?: number[];
}
