import { SchedulerType } from '../../interfaces';

export const schedulerTypeOptions = Object.values(SchedulerType).map(
  (value) => ({
    label: value === SchedulerType.Custom ? 'custom cron options' : value,
    value,
  }),
);
