import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Select,
  useSelect,
} from '@pankod/refine-antd';
import type { FormProps } from '@pankod/refine-antd';

import { ICustomer, IQuery, IUser } from '../../interfaces';
import { jobStatusOptions } from './jobStatusOptions';

export const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const { selectProps: userSelectProps } = useSelect<IUser>({
    resource: 'users',
    optionLabel: 'email',
    sort: [
      {
        field: 'email',
        order: 'asc',
      },
    ],
  });

  const { selectProps: querySelectProps } = useSelect<IQuery>({
    resource: 'queries',
    optionLabel: 'name',
    sort: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const { selectProps: customerSelectProps } = useSelect<ICustomer>({
    resource: 'customers',
    optionLabel: 'firstName',
    sort: [
      {
        field: 'firstName',
        order: 'asc',
      },
    ],
  });

  return (
    <Card title="Filters">
      <Form layout="vertical" {...props.formProps}>
        <Row gutter={[10, 0]} align="bottom">
          <Col xs={24} xl={24} md={12}>
            <Form.Item label="User" name="userId">
              <Select allowClear placeholder="User" {...userSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={24} md={12}>
            <Form.Item label="Query" name="queryId">
              <Select allowClear placeholder="Query" {...querySelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={24} md={8}>
            <Form.Item label="Customer" name="customerId">
              <Select
                allowClear
                placeholder="Customer"
                {...customerSelectProps}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={24} md={8}>
            <Form.Item label="Status" name="status">
              <Select
                allowClear
                placeholder="Job status"
                options={jobStatusOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={24} md={8}>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                htmlType="submit"
                type="primary"
              >
                Filter
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
