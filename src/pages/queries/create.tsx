import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Create, useForm } from '@pankod/refine-antd';

import type { IQuery } from '../../interfaces';
import { QueryForm } from './form';

export const QueryCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<
    IQuery,
    HttpError,
    IQuery
  >();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <QueryForm formProps={formProps} queryResult={queryResult} />
    </Create>
  );
};
