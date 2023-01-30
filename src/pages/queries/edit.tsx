import type { IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, useForm } from '@pankod/refine-antd';

import { IQuery } from '../../interfaces';
import { QueryForm } from './form';

export const QueryEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, queryResult, saveButtonProps } = useForm<IQuery>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <QueryForm formProps={formProps} queryResult={queryResult} />
    </Edit>
  );
};
