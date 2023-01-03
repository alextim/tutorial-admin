import { useGetIdentity } from '@pankod/refine-core';

import {
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AntdLayout,
} from '@pankod/refine-antd';
import { IUser } from '../../interfaces';

const { Header: AntdHeader } = AntdLayout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export const Header = () => {
  const { data } = useGetIdentity();
  const { firstName = '', lastName = '', avatar } = (data as IUser) || {};
  const fullName = `${lastName} ${firstName}`;
  const screens = useBreakpoint();

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
        <Col xs={0} sm={12}></Col>
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
