import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';

import { Edit, useForm } from '@pankod/refine-antd';

import type { IProxy } from '../../interfaces';
import { ProxyForm } from './form';

export const ProxyEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IProxy, HttpError, IProxy>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ProxyForm formProps={formProps} />
    </Edit>
  );
};
