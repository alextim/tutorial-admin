import { Row, Col, Typography } from '@pankod/refine-antd';

const { Text } = Typography;

export const DashboardPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col md={24}>
        <Text>col 1</Text>
      </Col>
      <Col xl={17} lg={16} md={24} sm={24} xs={24}>
        <Text>col 2</Text>
      </Col>
      <Col xl={7} lg={8} md={24} sm={24} xs={24}>
        <Text>col 3</Text>
      </Col>
    </Row>
  );
};
