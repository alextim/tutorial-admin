import { Dayjs } from 'dayjs';
import { IEntityBase } from './IEntityBase';
import { JobStatus } from './job-status.enum';

export interface IJob extends IEntityBase {
  requestInterval: number;

  pageLoadDelay: number;

  timeout: number;

  status: JobStatus;

  queryId: number;

  proxyId?: number;

  customerId: number;

  userId: number;
}

export interface IJobFilterVariables {
  q?: string;

  queryId?: number;
  proxyId?: number;
  customerId?: number;
  userId?: number;

  createdAt?: [Dayjs, Dayjs];
  status?: JobStatus;
}
