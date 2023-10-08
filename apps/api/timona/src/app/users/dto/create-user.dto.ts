export class CreateUserDto {}
export interface UsersDTO {
  id: string;
  SDT: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  profile: string;
  Ngaytao: Date;
  Role:string;
  Phanquyen:string;
  Menu:string;
  Trangthai:number;
}
export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
  Dev = 'dev',
  Iso = 'iso',
}
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
