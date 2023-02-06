import { SchedulerType } from '../../interfaces';

export const schedulerTypeOptions = Object.values(SchedulerType).map((value) => ({
  label: value,
  value,
}));
