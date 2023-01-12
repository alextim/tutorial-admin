import { IResourceComponentsProps } from '@pankod/refine-core';

import { Create, useForm } from '@pankod/refine-antd';

import { IProxy } from '../../interfaces';
import { ProxyForm } from './form';

export const ProxyCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IProxy>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProxyForm formProps={formProps} />
    </Create>
  );
};
