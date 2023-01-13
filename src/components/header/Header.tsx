import {
  useGetIdentity,
  useIsExistAuthentication,
  useLogout,
  useTranslate,
} from '@pankod/refine-core';

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
import { LogoutOutlined } from '@ant-design/icons';
import { ThemeSwitch } from './ThemeSwitch';
const { Header: AntdHeader } = AntdLayout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface Props {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const Header: React.FC<Props> = (props) => {
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
      label: translate('buttons.logout', 'Logout'),
      icon: <LogoutOutlined />,
      onClick: () => logout(),
    },
  ];

  return (
    <AntdHeader
      style={{
        padding: '0 24px',
        background: props.theme === 'light' ? 'white' : 'darkgray',
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? 'space-between' : 'end',
        }}
      >
        <Col xs={0} sm={12}></Col>
        <Col>
          <Space size="middle" align="center"  style={{
        verticalAlign: 'middle',
      }}>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            align={{ offset: [0, 25] }}
          >
            <a onClick={(e) => e.preventDefault()}>
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
                <Icons.DownOutlined />
              </Space>
            </a>
            </Dropdown>
            <Space size="middle" align="center" style={{verticalAlign: 'center'}}>
              <ThemeSwitch {...props} />
              </Space>
            </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
