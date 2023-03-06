import { Table, useTable, getDefaultSortOrder } from '@pankod/refine-antd';

import type { IProxy } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';

export const ProxyList = () => {
  const { tableProps, sorter } = useTable<IProxy>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  return (
    <CrudList resource="proxies" tableProps={tableProps} sorter={sorter}>
      <Table.Column
        key="name"
        dataIndex="name"
        title="Name"
        sorter
        defaultSortOrder={getDefaultSortOrder('name', sorter)}
      />

      <Table.Column dataIndex="region" title="Region" />
      <Table.Column dataIndex="host" title="Host" />
      <Table.Column dataIndex="port" title="Port" />
      <Table.Column dataIndex="username" title="Username" />
      <Table.Column title="Status" />
    </CrudList>
  );
};
