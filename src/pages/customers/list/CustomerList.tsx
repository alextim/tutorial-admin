import React from 'react';
import {
  IResourceComponentsProps,
  useDelete,
  useDeleteMany,
  useNavigation,
} from '@pankod/refine-core';
import {
  List,
  Table,
  useTable,
  Space,
  DateField,
  getDefaultSortOrder,
  Dropdown,
  Icons,
  Typography,
  MenuProps,
  DeleteButton,
} from '@pankod/refine-antd';

import { ICustomer } from '../../../interfaces';

const renderDate = (value: any) => <DateField value={value} format="LLL" />;

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const { show, edit } = useNavigation();

  const { tableProps, sorter } = useTable<ICustomer>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  const { mutate: mutateDelete } = useDelete();
  const { mutate: mutateDeleteMany, isLoading: isDeleting } = useDeleteMany();

  const moreMenu = (record: ICustomer): MenuProps => ({
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
          edit('customers', record.id);
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
            resource: 'customers',
            id: record.id,
            mutationMode: 'pessimistic',
          });
        },
      },
    ],
  });

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const deleteSelectedItems = () => {
    mutateDeleteMany(
      {
        resource: 'customers',
        ids: selectedRowKeys.map(Number),
        mutationMode: 'pessimistic',
      },
      {
        onSuccess: () => {
          setSelectedRowKeys([]);
        },
      },
    );
  };

  return (
    <List
      headerProps={{
        subTitle: hasSelected && (
          <DeleteButton
            onClick={() => deleteSelectedItems()}
            loading={isDeleting}
          >
            Delete selected
          </DeleteButton>
        ),
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        rowSelection={rowSelection}
        onRow={(record) => {
          return {
            onClick: () => {
              show('customers', record.id);
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
          key="Name"
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

        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          key="createdAt"
          sorter
          defaultSortOrder={getDefaultSortOrder('createdAt', sorter)}
          render={renderDate}
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Updated At"
          key="updatedAt"
          sorter
          defaultSortOrder={getDefaultSortOrder('updatedAt', sorter)}
          render={renderDate}
        />

        <Table.Column<ICustomer>
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
