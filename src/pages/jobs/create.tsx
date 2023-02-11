import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Create, useForm } from '@pankod/refine-antd';

import { IJob } from '../../interfaces';
import { JobForm } from './form';

export const JobCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IJob, HttpError, IJob>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <JobForm formProps={formProps} />
    </Create>
  );
};
