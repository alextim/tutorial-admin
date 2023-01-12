import { Role } from '../../interfaces';

export const roleOptions = Object.values(Role).map((value) => ({
  label: value,
  value,
}));
