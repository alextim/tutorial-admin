import type { IEntityBase } from './IEntityBase';
export const AUTH_COOKIE_LENGTH = 152;

export interface ICustomer extends IEntityBase {
  firstName?: string;
  lastName?: string;

  authCookie: string;
}
