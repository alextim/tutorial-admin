import { IResourceComponentsProps } from '@pankod/refine-core';

import { Edit, useForm } from '@pankod/refine-antd';

import { IProxy } from '../../interfaces';
import { ProxyForm } from './form';

export const ProxyEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IProxy>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ProxyForm formProps={formProps} />
    </Edit>
  );
};
