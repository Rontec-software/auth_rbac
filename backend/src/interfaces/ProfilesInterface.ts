export interface ICreateProfile {
  name: string;
  description: string;
}

export interface IUpdateProfile {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
