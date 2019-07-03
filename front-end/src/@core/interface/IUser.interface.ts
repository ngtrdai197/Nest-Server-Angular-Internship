import { IRole } from './IRole.interface';

export interface IUser {
  _id?: String;
  username: String;
  password: String;
  fullname: String;
  phone: String,
  email: String,
  address?: String;
  role?: IRole | String;
}
