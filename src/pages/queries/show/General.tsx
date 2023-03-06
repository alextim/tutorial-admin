import {
  BooleanField,
  DateField,
  Divider,
  Typography,
  UrlField,
} from '@pankod/refine-antd';

import type { IQuery } from '../../../interfaces';

const { Title, Text } = Typography;

type Props = {
  record: IQuery | undefined;
};

export const General = ({ record }: Props) => (
  <>
    <Title level={5}>Id</Title>
    <Text>{record?.id}</Text>

    <Divider />

    <Title level={5}>Name</Title>
    <Text>{record?.name}</Text>

    <Title level={5}>Start Url</Title>
    <Text>
      <UrlField value={record?.startUrl} />
    </Text>

    <Title level={5}>Is List?</Title>
    <Text>
      <BooleanField value={record?.isList} />
    </Text>

    <Title level={5}>Items count</Title>
    <Text>{record?.itemCount}</Text>

    <Title level={5}>Request Interval</Title>
    <Text>{record?.requestInterval}</Text>

    <Title level={5}>Page Load Delay</Title>
    <Text>{record?.pageLoadDelay}</Text>

    <Title level={5}>Timeout</Title>
    <Text>{record?.timeout}</Text>

    <Title level={5}>Wait Until</Title>
    <Text>{record?.waitUntil}</Text>

    <Title level={5}>Proxy</Title>
    <Text>{record?.proxy?.name || 'No proxy'}</Text>

    <Divider />

    <Title level={5}>Created At</Title>
    <Text>
      <DateField value={record?.createdAt} format="LLL" />
    </Text>

    <Title level={5}>Updated At</Title>
    <Text>
      <DateField value={record?.updatedAt} format="LLL" />
    </Text>
  </>
);
