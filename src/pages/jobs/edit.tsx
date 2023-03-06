import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, useForm } from '@pankod/refine-antd';

import type { IJob } from '../../interfaces';
import { JobForm } from './form';

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IJob, HttpError, IJob>({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <JobForm formProps={formProps} />
    </Edit>
  );
};
