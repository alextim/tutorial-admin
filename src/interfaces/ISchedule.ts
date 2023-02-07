import { SchedulerType, DailyWeekdays, IntervalType } from './schedule.types';

export interface ISchedule {
  requestInterval: number;

  pageLoadDelay: number;

  timeout: number;

  queryId: number;

  proxyId?: number;

  customerId: number;

  userId: number;
/*

  minute: string;

  hour: string;

  dayOfMonth: string;

  month: string;

  dayOfWeek: string;
*/

  schedulerEnabled?: boolean;

  timezoneId?: number;

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

