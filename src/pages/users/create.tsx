import { IResourceComponentsProps } from '@pankod/refine-core';

import { Create, useForm } from '@pankod/refine-antd';

import { IUser } from '../../interfaces';
import { UserForm } from './form';

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <UserForm formProps={formProps} />
    </Create>
  );
};
