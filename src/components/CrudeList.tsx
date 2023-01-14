import React from 'react';
import { useDelete, useDeleteMany, useNavigation } from '@pankod/refine-core';
import {
  List,
  Table,
  DateField,
  getDefaultSortOrder,
  Dropdown,
  Icons,
  MenuProps,
  DeleteButton,
} from '@pankod/refine-antd';

import type { IEntityBase } from '../interfaces/IEntityBase';

const renderDate = (value: any) => <DateField value={value} format="LLL" />;
type Props = {
  resource: string;
  children: React.ReactNode;
  tableProps: any;
  sorter: any;
  menuConfig?: {
    itemsFn?: (record: any) => Record<string, any>[];
    edit?: boolean;
    delete?: boolean;
  };
};

export const CrudList = ({
  resource,
  children,
  tableProps,
  sorter,
  menuConfig,
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const { show, edit } = useNavigation();

  const { mutate: mutateDelete } = useDelete();
  const { mutate: mutateDeleteMany, isLoading: isDeleting } = useDeleteMany();

  const moreMenu = (record: IEntityBase): MenuProps => {
    const items: any[] = [];
    if (!menuConfig || menuConfig.edit !== false) {
      items.push({
        key: 'edit',
        label: 'Edit',
        icon: (
          <Icons.EditOutlined
            style={{
              color: '#52c41a',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info: any) => {
          info.domEvent.stopPropagation();
          edit(resource, record.id);
        },
      });
    }
    if (!menuConfig || menuConfig.delete !== false) {
      items.push({
        key: 'delete',
        label: 'Delete',
        icon: (
          <Icons.CloseCircleOutlined
            style={{
              color: '#EE2A1E',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info: any) => {
          info.domEvent.stopPropagation();
          mutateDelete({
            resource,
            id: record.id,
            mutationMode: 'pessimistic',
          });
        },
      });
    }
    if (menuConfig?.itemsFn) {
      items.push(...menuConfig.itemsFn(record));
    }
    return {
      items,
    };
  };

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
        resource,
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
              show(resource, record.id);
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

        {children}

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

        <Table.Column
          fixed="right"
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Dropdown
              menu={moreMenu(record as IEntityBase)}
              trigger={['click']}
            >
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
