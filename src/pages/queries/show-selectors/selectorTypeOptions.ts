import { SelectorType } from '../../../interfaces';

export const selectorTypeOptions = Object.values(SelectorType).map((value) => ({
  label: value,
  value,
}));
