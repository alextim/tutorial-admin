import { useState } from 'react';
import { useApiUrl } from '@pankod/refine-core';
import {
  Table,
  useTable,
  Space,
  getDefaultSortOrder,
  TagField,
  EmailField,
  Icons,
  Avatar,
  Typography,
  useModalForm,
  FilterDropdown,
  Select,
} from '@pankod/refine-antd';

import { IUser, Role } from '../../../interfaces';
import { CrudList } from '../../../components/CrudeList';
import { roleOptions } from '../roleOptions';

import { SetPasswordModal } from './set-password';
import { sendEmailVerificationLink, sendPasswordResetToken } from './send';

export const UserList = () => {
  const apiUrl = useApiUrl();
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

  const {
    tableProps,
    sorter,
    // filters
  } = useTable<IUser>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });

  const extraMenuItems = (record: any) => [
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
      onClick: (info: any) => {
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
      onClick: (info: any) => {
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
      onClick: (info: any) => {
        void (async () => {
          setCurrentRecord(record);
          info.domEvent.stopPropagation();
          await sendPasswordResetToken(record.email, apiUrl);
        })();
      },
    },
  ];

  return (
    <>
      <SetPasswordModal
        user={currentRecord}
        modalProps={modalProps}
        formProps={formProps}
      />
      <CrudList
        resource="users"
        tableProps={tableProps}
        sorter={sorter}
        menuConfig={{ itemsFn: extraMenuItems }}
      >
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
      </CrudList>
    </>
  );
};
