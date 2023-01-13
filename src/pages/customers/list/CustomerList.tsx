import {
  Table,
  useTable,
  Space,
  getDefaultSortOrder,
  Typography,
} from '@pankod/refine-antd';

import { ICustomer } from '../../../interfaces';
import { CrudList } from '../../../components/CrudeList';

export const CustomerList = () => {
  const { tableProps, sorter } = useTable<ICustomer>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  return (
    <CrudList resource="customers" tableProps={tableProps} sorter={sorter}>
      <Table.Column
        key="name"
        title="Name"
        sorter
        defaultSortOrder={getDefaultSortOrder('lastName', sorter)}
        render={({ lastName = '', firstName = '' }: ICustomer) => (
          <Space>
            <Typography.Text style={{ wordBreak: 'inherit' }}>
              {lastName} {firstName}
            </Typography.Text>
          </Space>
        )}
      />
    </CrudList>
  );
};
