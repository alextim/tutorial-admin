import type { IResourceComponentsProps } from '@pankod/refine-core';
import { useShow } from '@pankod/refine-core';
import { Show, Tabs } from '@pankod/refine-antd';

import type { IQuery } from '../../../interfaces';
import { General } from './General';
import { Selectors } from './Selectors';

export const QueryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IQuery>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Tabs
        type="card"
        items={[
          {
            label: 'General',
            key: '1',
            children: <General record={record} />,
          },
          {
            label: 'Selectors',
            key: '2',
            children: <Selectors record={record} />,
          },
        ]}
      />
    </Show>
  );
};
