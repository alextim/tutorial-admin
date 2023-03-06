import {
  Table,
  useTable,
  getDefaultSortOrder,
  TextField,
  Icons,
  UrlField,
} from '@pankod/refine-antd';
import { useNavigation } from '@pankod/refine-core';

import type { IQuery } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';

export const QueryList = () => {
  const { push } = useNavigation();
  const { tableProps, sorter } = useTable<IQuery>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });
  const extraMenuItems = (record: any) => [
    {
      key: 6,
      label: 'Selectors',
      icon: (
        <Icons.SelectOutlined
          style={{
            color: 'blue',
            fontSize: 17,
          }}
        />
      ),
      onClick: (info: any) => {
        info.domEvent.stopPropagation();
        push(`/queries/${record.id}/selectors`);
      },
    },
  ];

  return (
    <CrudList
      resource="queries"
      tableProps={tableProps}
      sorter={sorter}
      menuConfig={{ itemsFn: extraMenuItems }}
    >
      <Table.Column
        dataIndex="name"
        title="Name"
        sorter
        defaultSortOrder={getDefaultSortOrder('name', sorter)}
      />

      <Table.Column
        dataIndex="startUrl"
        title="Start Url"
        render={(value) => <UrlField value={value} />}
      />

      <Table.Column
        dataIndex="isList"
        title="Is List?"
        render={(value) => (value ? 'yes' : '')}
      />
      <Table.Column dataIndex="itemCount" title="Items count" />

      <Table.Column dataIndex="requestInterval" title="Request Interval" />
      <Table.Column dataIndex="pageLoadDelay" title="Page Load Delay" />
      <Table.Column dataIndex="timeout" title="Timeout" />
      <Table.Column dataIndex="waitUntil" title="Wait Until" />

      <Table.Column
        dataIndex="proxy"
        title="Proxy"
        render={(value) => <TextField value={value?.name} />}
      />
    </CrudList>
  );
};
