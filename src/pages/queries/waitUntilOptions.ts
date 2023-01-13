import { WaitUntil } from '../../interfaces';

export const waitUntilOptions = Object.values(WaitUntil).map((value) => ({
  label: value,
  value,
}));
