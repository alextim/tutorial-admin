import type { IResourceComponentsProps } from '@pankod/refine-core';

import { Edit, useForm } from '@pankod/refine-mantine';

import { IUser } from '../../interfaces';
import { UserForm } from './form';

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IUser>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} />
    </Edit>
  );
};
