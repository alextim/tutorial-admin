import { IResourceComponentsProps } from '@pankod/refine-core';

import { Create, useForm } from '@pankod/refine-antd';

import { ICustomer } from '../../interfaces';
import { CustomerForm } from './form';

export const CustomerCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ICustomer>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <CustomerForm formProps={formProps} />
    </Create>
  );
};
