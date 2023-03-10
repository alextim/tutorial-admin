import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, useForm } from '@pankod/refine-antd';

import type { ICustomer } from '../../interfaces';
import { CustomerForm } from './form';

export const CustomerEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<
    ICustomer,
    HttpError,
    ICustomer
  >({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <CustomerForm formProps={formProps} />
    </Edit>
  );
};
