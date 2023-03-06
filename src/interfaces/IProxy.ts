import type { IEntityBase } from './IEntityBase';

export interface IProxy extends IEntityBase {
  name: string;

  token?: string;

  username: string;

  password: string;

  region: string;

  parallelScrapingJobLimit?: number;

  host?: string;

  port?: number;
}
