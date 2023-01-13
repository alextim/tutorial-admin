import { IEntityBase } from './IEntityBase';

export interface ICustomer extends IEntityBase {
  firstName?: string;
  lastName?: string;

  authCookie: string;
}
