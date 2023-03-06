import type { IEntityBase } from './IEntityBase';

export interface ITimezone extends IEntityBase {
  code: string;
  name: string;
}
