import { IResourceComponentsProps } from '@pankod/refine-core';
import { Create, useForm } from '@pankod/refine-antd';

import { ISchedule } from '../../interfaces';
import { ScheduleForm } from './form';

export const ScheduleCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ISchedule>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ScheduleForm formProps={formProps} />
    </Create>
  );
};
