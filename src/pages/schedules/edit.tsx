import type { HttpError, IResourceComponentsProps } from '@pankod/refine-core';
import { Edit, useForm } from '@pankod/refine-antd';

import type { ISchedule } from '../../interfaces';
import { ScheduleForm } from './form';

export const ScheduleEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<
    ISchedule,
    HttpError,
    ISchedule
  >({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ScheduleForm formProps={formProps} />
    </Edit>
  );
};
