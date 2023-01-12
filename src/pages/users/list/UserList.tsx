import { useState } from 'react';
import {
  IResourceComponentsProps,
  useDelete,
  useNavigation,
  useApiUrl,
} from '@pankod/refine-core';
import {
  List,
  Table,
  useTable,
  Space,
  DateField,
  getDefaultSortOrder,
  TagField,
  EmailField,
  Dropdown,
  Icons,
  Avatar,
  Typography,
  MenuProps,
  useModalForm,
  FilterDropdown,
  Select,
} from '@pankod/refine-antd';

import { IUser, Role } from '../../../interfaces';
import { roleOptions } from '../roleOptions';

import { SetPasswordModal } from './set-password';
import { sendEmailVerificationLink, sendPasswordResetToken } from './send';

const renderDate = (value: any) => <DateField value={value} format="LLL" />;

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const apiUrl = useApiUrl();
  const { show, edit } = useNavigation();
  const [currentRecord, setCurrentRecord] = useState<IUser | undefined>();

  const {
    formProps,
    modalProps,
    show: showChangePasswordModal,
  } = useModalForm({
    action: 'edit',
    resource: 'users/set-password',
    redirect: false,
  });

  const { tableProps, sorter } = useTable<IUser>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  const { mutate: mutateDelete } = useDelete();

  const moreMenu = (record: IUser): MenuProps => ({
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
          edit('users', record.id);
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
            resource: 'users',
            id: record.id,
            mutationMode: 'undoable',
          });
        },
      },
      {
        key: 3,
        label: 'Set password',
        icon: (
          <Icons.LockOutlined
            style={{
              color: 'blue',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info) => {
          setCurrentRecord(record);
          info.domEvent.stopPropagation();
          showChangePasswordModal(record.id);
        },
      },
      {
        key: 4,
        label: 'Send e-mail verification link',
        icon: (
          <Icons.MailOutlined
            style={{
              color: 'blue',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info) => {
          void (async () => {
            setCurrentRecord(record);
            info.domEvent.stopPropagation();
            await sendEmailVerificationLink(record.email, apiUrl);
          })();
        },
      },
      {
        key: 5,
        label: 'Send password reset token',
        icon: (
          <Icons.KeyOutlined
            style={{
              color: 'blue',
              fontSize: 17,
            }}
          />
        ),
        onClick: (info) => {
          void (async () => {
            setCurrentRecord(record);
            info.domEvent.stopPropagation();
            await sendPasswordResetToken(record.email, apiUrl);
          })();
        },
      },
    ],
  });

  return (
    <>
      <SetPasswordModal
        user={currentRecord}
        modalProps={modalProps}
        formProps={formProps}
      />
      <List>
        <Table
          {...tableProps}
          rowKey="id"
          onRow={(record) => {
            return {
              onClick: () => {
                show('users', record.id);
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
            defaultSortOrder={getDefaultSortOrder('lastName', sorter)}
            render={({ lastName = '', firstName = '', avatar }: IUser) => (
              <Space>
                <Avatar size={74} src={avatar?.url} />
                <Typography.Text style={{ wordBreak: 'inherit' }}>
                  {lastName} {firstName}
                </Typography.Text>
              </Space>
            )}
          />

          <Table.Column dataIndex="phone" title="Phone" />

          <Table.Column
            dataIndex="email"
            title="E-mail"
            key="email"
            sorter
            defaultSortOrder={getDefaultSortOrder('email', sorter)}
            render={(value: string) => <EmailField value={value} />}
          />

          <Table.Column
            dataIndex="username"
            title="username"
            key="username"
            sorter
            defaultSortOrder={getDefaultSortOrder('username', sorter)}
          />

          <Table.Column
            dataIndex="roles"
            title="Roles"
            render={(roles: Role[]) =>
              roles.map((role) => <TagField key={role} value={role} />)
            }
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Role"
                  options={roleOptions}
                />
              </FilterDropdown>
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

          <Table.Column<IUser>
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
    </>
  );
};
