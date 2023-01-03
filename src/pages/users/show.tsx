import { useShow, IResourceComponentsProps } from '@pankod/refine-core';
import {
  DateField,
  Divider,
  Show,
  Typography,
  Space,
  EmailField,
  Row,
  Col,
  Card,
  Avatar,
  Icons,
  Grid,
  TagField,
} from '@pankod/refine-antd';

import { IUser } from '../../interfaces';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { xl } = useBreakpoint();
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Row gutter={20}>
        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ height: '100%' }}>
            <Space
              direction="vertical"
              style={{ width: '100%', height: '100%' }}
            >
              <Avatar size={120} src={record?.avatar?.url}></Avatar>
              <Typography.Title level={3}>
                {record?.firstName} {record?.lastName}
              </Typography.Title>
            </Space>
            <Space
              direction="vertical"
              style={{
                width: '100%',
                textAlign: xl ? 'unset' : 'center',
              }}
            >
              <Typography.Text>
                <Icons.MailOutlined /> <EmailField value={record?.email} />
              </Typography.Text>

              {record?.phone && (
                <Typography.Text>
                  <Icons.PhoneOutlined /> {record?.phone}
                </Typography.Text>
              )}

              {record?.googleId && (
                <Typography.Text>
                  <Icons.GoogleOutlined /> {record?.googleId}
                </Typography.Text>
              )}

              {record?.facebookId && (
                <Typography.Text>
                  <Icons.FacebookOutlined /> {record?.facebookId}
                </Typography.Text>
              )}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Title level={5}>Id</Title>
          <Text>{record?.id}</Text>

          <Divider />

          <Title level={5}>Roles</Title>
          <Text>
            {record?.roles.map((role) => (
              <TagField key={role} value={role} />
            ))}
          </Text>

          {record?.isRegisteredWithGoogle && (
            <>
              <Title level={5}>Registered With Google</Title>
              <Text>yes</Text>
            </>
          )}

          {record?.isRegisteredWithFacebook && (
            <>
              <Title level={5}>Registered With Facebook</Title>
              <Text>yes</Text>
            </>
          )}

          {record?.verificationCodeSentAt && (
            <>
              <Title level={5}>Verification Sent At</Title>
              <Text>
                <DateField
                  value={record?.verificationCodeSentAt}
                  format="LLL"
                />
              </Text>
            </>
          )}

          {record?.verifiedAt && (
            <>
              <Title level={5}>Verified At</Title>
              <Text>
                <DateField value={record?.verifiedAt} format="LLL" />
              </Text>
            </>
          )}

          <Divider />

          <Title level={5}>Created At</Title>
          <Text>
            <DateField value={record?.createdAt} format="LLL" />
          </Text>

          <Title level={5}>Updated At</Title>
          <Text>
            <DateField value={record?.updatedAt} format="LLL" />
          </Text>
        </Col>
      </Row>
    </Show>
  );
};
