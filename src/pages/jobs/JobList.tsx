import {
  Table,
  useTable,
  getDefaultSortOrder,
  TextField,
} from '@pankod/refine-antd';

import { IJob } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';

export const JobList = () => {
  const { tableProps, sorter } = useTable<IJob>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  return (
    <CrudList resource="jobs" tableProps={tableProps} sorter={sorter}>
      <Table.Column dataIndex="requestInterval" title="Request interval" />
      <Table.Column dataIndex="pageLoadDelay" title="Page load delay" />
      <Table.Column dataIndex="timeout" title="Timeout" />
      <Table.Column
        key="status"
        dataIndex="status"
        title="Status"
        sorter
        defaultSortOrder={getDefaultSortOrder('status', sorter)}
      />
      <Table.Column
        dataIndex="query"
        title="Query"
        render={(value) => <TextField value={value?.name} />}
      />
      <Table.Column
        dataIndex="proxy"
        title="Proxy"
        render={(value) => <TextField value={value?.name} />}
      />
      <Table.Column
        dataIndex="customer"
        title="Customer"
        render={(value) => <TextField value={`${value?.firstName || ''} ${value?.lastName || ''}`} />}
      />
      <Table.Column
        dataIndex="user"
        title="User"
        render={(value) => <TextField value={value?.email} />}
      />
    </CrudList>
  );
};
