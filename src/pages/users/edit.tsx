import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, useForm } from '@pankod/refine-antd';

import type { IUser } from '../../interfaces';
import { UserForm } from './form';

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IUser, HttpError, IUser>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} />
    </Edit>
  );
};
