import {
  Table,
  useTable,
  getDefaultSortOrder,
  TextField,
  Row,
  Col,
} from '@pankod/refine-antd';

import { IJob } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';
import { Filter } from './Filter';

export const JobList = () => {
  const { tableProps, sorter, searchFormProps } = useTable<IJob>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
    onSearch: (params) => {
      const { userId, queryId, customerId, status } = params as IJob;

      return [
        {
          field: 'userId',
          operator: 'eq',
          value: userId,
        },
        {
          field: 'queryId',
          operator: 'eq',
          value: queryId,
        },
        {
          field: 'customerId',
          operator: 'eq',
          value: customerId,
        },
        {
          field: 'status',
          operator: 'eq',
          value: status,
        },
      ];
    },
    syncWithLocation: false,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col
        xl={4}
        lg={24}
        xs={24}
        style={{
          marginTop: '48px',
        }}
      >
        <Filter formProps={searchFormProps} />
      </Col>

      <Col xl={20} xs={24}>
        <CrudList resource="jobs" tableProps={tableProps} sorter={sorter}>
          <Table.Column
            dataIndex="user"
            title="User"
            render={(value) => <TextField value={value?.email} />}
          />
          <Table.Column
            dataIndex="query"
            title="Query"
            render={(value) => <TextField value={value?.name} />}
          />
          <Table.Column
            dataIndex="customer"
            title="Customer"
            render={(value) => (
              <TextField
                value={`${value?.firstName || ''} ${value?.lastName || ''}`}
              />
            )}
          />
          <Table.Column
            key="status"
            dataIndex="status"
            title="Status"
            sorter
            defaultSortOrder={getDefaultSortOrder('status', sorter)}
          />

          <Table.Column dataIndex="requestInterval" title="Request interval" />
          <Table.Column dataIndex="pageLoadDelay" title="Page load delay" />
          <Table.Column dataIndex="timeout" title="Timeout" />
          <Table.Column
            dataIndex="proxy"
            title="Proxy"
            render={(value) => <TextField value={value?.name} />}
          />
        </CrudList>
      </Col>
    </Row>
  );
};
