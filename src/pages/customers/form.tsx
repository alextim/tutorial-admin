import type { FormProps } from '@pankod/refine-antd';
import { Form, Input, Row, Col } from '@pankod/refine-antd';

import type { ICustomer } from '../../interfaces';
import { AUTH_COOKIE_LENGTH } from '../../interfaces/ICustomer';

type Props = {
  formProps: FormProps<ICustomer>;
};

export const CustomerForm = ({ formProps }: Props) => {
  return (
    <Form
      {...formProps}
      layout="vertical"
      initialValues={{
        ...formProps.initialValues,
        authCookie: formProps.initialValues?.linkedInProfile?.authCookie,
      }}
      onFinish={(values) => {
        const { authCookie, ...rest } = values as any;
        const dto = {
          linkedInProfile: {
            id: formProps.initialValues?.linkedInProfile?.id,
            authCookie,
          },
          ...rest,
        };
        return formProps.onFinish && formProps.onFinish(dto);
      }}
    >
      <Row gutter={20}>
        <Col xs={24} lg={12}>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Authentication Cookie"
        name="authCookie"
        rules={[
          {
            required: true,
          },
          {
            min: AUTH_COOKIE_LENGTH,
          },
          {
            max: AUTH_COOKIE_LENGTH,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
