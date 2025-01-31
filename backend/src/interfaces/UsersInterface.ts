export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileIds?: number[];
  active: boolean;
}

export interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileIds?: number[];
  active: boolean;
}

export interface IPasswordResetToken {
  email: string;
  token: string;
  expToken: Date;
}
