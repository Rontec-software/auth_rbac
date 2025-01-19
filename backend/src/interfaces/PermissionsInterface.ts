export interface ICreatePermission {
  name: string;
  descrition: string;
}

export interface IUpdatePermission {
  id: string;
  name: string;
  descrition: string;
  active: boolean;
}
