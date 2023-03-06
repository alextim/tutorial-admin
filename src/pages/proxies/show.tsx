import { useShow, IResourceComponentsProps } from '@pankod/refine-core';
import { DateField, Divider, Show, Typography } from '@pankod/refine-antd';

import type { IProxy } from '../../interfaces';

const { Title, Text } = Typography;

export const ProxyShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IProxy>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Divider />

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Proxy access username</Title>
      <Text>{record?.region}</Text>

      <Title level={5}>Parallel scraping job limit</Title>
      <Text>{record?.parallelScrapingJobLimit}</Text>

      <Title level={5}>Host</Title>
      <Text>{record?.host}</Text>
      <Title level={5}>Port</Title>
      <Text>{record?.port}</Text>

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
