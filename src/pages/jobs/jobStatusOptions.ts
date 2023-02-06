import { JobStatus } from '../../interfaces';

export const jobStatusOptions = Object.values(JobStatus).map((value) => ({
  label: value,
  value,
}));
