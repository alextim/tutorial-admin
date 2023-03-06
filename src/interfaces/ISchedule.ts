import type { IEntityBase } from './IEntityBase';
import type { SchedulerType, IntervalType } from './schedule.types';

export interface ISchedule extends IEntityBase {
  requestInterval: number;
  pageLoadDelay: number;
  timeout: number;

  userId: number;
  queryId: number;
  customerId: number;
  proxyId?: number;

  schedulerEnabled?: boolean;
  timezoneId: number | null;
  schedulerType?: SchedulerType;

  /**
   * daily
   */
  dailyWeekdays?: number[];
  dailyTime?: string;

  /**
   * interval
   */
  interval?: number;
  intervalType?: IntervalType;

  /**
   * custom
   */
  cron?: string;
}
