import { useGetIdentity, useIsExistAuthentication, useLogout, useTranslate } from '@pankod/refine-core';

import {
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AntdLayout,
  Dropdown,
  Icons,
  MenuProps,
} from '@pankod/refine-antd';
import { IUser } from '../../interfaces';
import { LogoutOutlined } from "@ant-design/icons"
const { Header: AntdHeader } = AntdLayout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export const Header = () => {
  const screens = useBreakpoint();
  const { mutate: logout } = useLogout();
  const translate = useTranslate();
  const { data: user } = useGetIdentity<IUser>() || {};
  const { email, firstName, lastName, avatar } = user || {};

  let fullName: string;
  if (lastName || firstName) {
    fullName = `${firstName || ''} ${lastName || ''}`;
  } else {
    fullName = email?.split('@', 1)[0] || '';
  }

  const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    key: '1',
    label: <a href="https://www.aliyun.com">Change password</a>,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: translate("buttons.logout", "Logout"),
    icon: <LogoutOutlined />,
    onClick: () => logout(),

  },
  ];



  return (
    <AntdHeader
      style={{
        padding: '0 24px',
        background: 'white',
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? 'space-between' : 'end',
        }}
      >
        <Col xs={0} sm={12}>
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Click me
                <Icons.DownOutlined />
              </Space>
            </a>
          </Dropdown>

        </Col>
        <Col>
          <Space size="middle" align="center">
            <Text
              ellipsis
              strong
              style={{
                display: 'flex',
              }}
            >
              {fullName}
            </Text>
            <Avatar size="large" src={avatar?.url} alt={fullName} />
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
