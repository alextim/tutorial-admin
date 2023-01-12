import {
  IResourceComponentsProps,
  useMany,
  useDelete,
  useNavigation,
} from '@pankod/refine-core';
import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Dropdown,
  Icons,
  MenuProps,
  TextField,
} from '@pankod/refine-antd';

import { IQuery, IProxy } from '../../interfaces';

export const QueryList: React.FC<IResourceComponentsProps> = () => {
  const { show, edit } = useNavigation();

  const { tableProps, sorter } = useTable<IQuery>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  const { mutate: mutateDelete } = useDelete();

  const proxyIds = tableProps?.dataSource?.map((item) => item.proxy?.id) ?? [];
  const { data: proxiesData, isLoading } = useMany<IProxy>({
    resource: 'proxies',
    ids: proxyIds,
    queryOptions: {
      enabled: proxyIds.length > 0,
    },
  });
  console.log('proxiesData', proxiesData);

  const moreMenu = (record: IQuery): MenuProps => ({
    items: [
      {
        key: 1,
        label: 'Edit',
        icon: (
          <Icons.EditOutlined
            style={{
              color: '#52c41a',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info) => {
          info.domEvent.stopPropagation();
          edit('queries', record.id);
        },
      },
      {
        key: 2,
        label: 'Delete',
        icon: (
          <Icons.CloseCircleOutlined
            style={{
              color: '#EE2A1E',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info) => {
          info.domEvent.stopPropagation();
          mutateDelete({
            resource: 'queries',
            id: record.id,
            mutationMode: 'undoable',
          });
        },
      },
    ],
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              show('queries', record.id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder('id', sorter)}
        />

        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder('name', sorter)}
        />

        <Table.Column dataIndex="startUrl" title="Start Url" />
        <Table.Column dataIndex="requestInterval" title="Request Interval" />
        <Table.Column dataIndex="pageLoadDelay" title="Page Load Delay" />
        <Table.Column dataIndex="timeout" title="Timeout" />
        <Table.Column dataIndex="waitUntil" title="Wait Until" />

        <Table.Column
          dataIndex="proxy"
          title="Proxy"
          render={(value) => <TextField value={value?.name} />}
        />

        <Table.Column<IQuery>
          fixed="right"
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Dropdown menu={moreMenu(record)} trigger={['click']}>
              <Icons.MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: 24,
                }}
              />
            </Dropdown>
          )}
        />
      </Table>
    </List>
  );
};
