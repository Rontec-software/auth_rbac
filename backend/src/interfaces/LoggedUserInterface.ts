export interface ILoggedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  active: boolean;
}
