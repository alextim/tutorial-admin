import {
  IResourceComponentsProps,
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
} from '@pankod/refine-antd';

import { IProxy } from '../../interfaces';

export const ProxyList: React.FC<IResourceComponentsProps> = () => {
  const { show, edit } = useNavigation();

  const { tableProps, sorter } = useTable<IProxy>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  const { mutate: mutateDelete } = useDelete();

  const moreMenu = (record: IProxy): MenuProps => ({
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
          edit('proxies', record.id);
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
            resource: 'proxies',
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
              show('proxies', record.id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="id"
          title="ID"
          key="id"
          sorter
          defaultSortOrder={getDefaultSortOrder('id', sorter)}
        />

        <Table.Column
          key="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder('name', sorter)}
        />

        <Table.Column dataIndex="region" title="Region" />
        <Table.Column dataIndex="host" title="Host" />
        <Table.Column dataIndex="port" title="Port" />
        <Table.Column dataIndex="username" title="Username" />
        <Table.Column title="Status" />

        <Table.Column<IProxy>
          fixed="right"
          title="Actions"
          dataIndex="actions"
          key="actions"
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
