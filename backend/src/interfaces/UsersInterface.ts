export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IPasswordResetToken {
  email: string;
  token: string;
  expToken: Date;
}