import { IntervalType } from '../../interfaces';

export const intervalTypeOptions = Object.values(IntervalType).map((value) => ({
  label: value,
  value,
}));
