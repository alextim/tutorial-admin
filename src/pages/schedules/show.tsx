import { useShow, IResourceComponentsProps } from '@pankod/refine-core';
import { DateField, Divider, Show, Typography } from '@pankod/refine-antd';

import type { ISchedule } from '../../interfaces';

const { Title, Text } = Typography;

export const ScheduleShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ISchedule>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Divider />

      <Title level={5}>Request interval</Title>
      <Text>{record?.requestInterval}</Text>

      <Title level={5}>Page load delay</Title>
      <Text>{record?.pageLoadDelay}</Text>

      <Title level={5}>Timeout</Title>
      <Text>{record?.timeout}</Text>

      <Title level={5}>Query</Title>
      <Text>{(record as any)?.query?.name}</Text>

      <Title level={5}>Proxy</Title>
      <Text>{(record as any)?.proxy?.name || 'No proxy'}</Text>

      <Title level={5}>Customer</Title>
      <Text>{(record as any)?.customer?.firstName}</Text>

      <Title level={5}>User</Title>
      <Text>{(record as any)?.user?.email}</Text>

      <Divider />

      <Title level={5}>Created At</Title>
      <Text>
        <DateField value={record?.createdAt} format="LLL" />
      </Text>

      <Title level={5}>Updated At</Title>
      <Text>
        <DateField value={record?.updatedAt} format="LLL" />
      </Text>
    </Show>
  );
};
