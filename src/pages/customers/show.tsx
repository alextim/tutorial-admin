import { useShow, IResourceComponentsProps } from '@pankod/refine-core';
import { DateField, Divider, Show, Typography } from '@pankod/refine-antd';

import type { ICustomer } from '../../interfaces';

const { Title, Text } = Typography;

export const CustomerShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ICustomer>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Divider />

      <Title level={5}>First Name</Title>
      <Text>{record?.firstName}</Text>

      <Title level={5}>Last Name</Title>
      <Text>{record?.lastName}</Text>

      <Title level={5}>Authentication Cookie</Title>
      <Text>{record?.authCookie}</Text>

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
