import { IEntityBase } from './IEntityBase';
import { IProxy } from './IProxy';
import { WaitUntil } from './wait-until.enum';

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