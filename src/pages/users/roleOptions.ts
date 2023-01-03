import { Role } from '../../interfaces';

export const roleOptions = Object.entries(Role).map(([, value]) => ({
  label: value,
  value,
}));
