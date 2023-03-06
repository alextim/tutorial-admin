import type { IEntityBase } from './IEntityBase';
import type { IProxy } from './IProxy';
import type { WaitUntil } from './wait-until.enum';

export interface IQuery extends IEntityBase {
  name: string;

  startUrl: string;

  isList?: boolean;

  itemCount?: number;

  requestInterval: number;

  pageLoadDelay: number;

  timeout: number;

  waitUntil: WaitUntil;

  proxy?: IProxy;
}
