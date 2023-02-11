import {
  Table,
  useTable,
  TextField,
  Icons,
  Row,
  Col,
} from '@pankod/refine-antd';

import { ISchedule } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';
import { Filter } from './Filter';

export const ScheduleList = () => {
  const { tableProps, sorter, searchFormProps } = useTable<ISchedule>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
    onSearch: (params) => {
      const { userId, queryId, customerId, schedulerEnabled } =
        params as ISchedule;

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
          field: 'schedulerEnabled',
          operator: 'eq',
          value: schedulerEnabled,
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
        <CrudList resource="schedules" tableProps={tableProps} sorter={sorter}>
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
            dataIndex="schedulerEnabled"
            title="Enabled"
            render={(value) => (value ? 'Yes' : null)}
          />
          <Table.Column dataIndex="requestInterval" title="Request interval" />
          <Table.Column dataIndex="pageLoadDelay" title="Page load delay" />
          <Table.Column dataIndex="timeout" title="Timeout" />
          <Table.Column
            dataIndex="proxy"
            title="Proxy"
            render={(value) =>
              value?.name ? <Icons.CheckOutlined title={value?.name} /> : null
            }
          />
        </CrudList>
      </Col>
    </Row>
  );
};
