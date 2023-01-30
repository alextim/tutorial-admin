import { Form, Input, FormProps } from '@pankod/refine-antd';

type Props = {
  formProps: FormProps<Record<string, any>>;
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
        const { authCookie, ...rest } = values;
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
      <Form.Item label="First Name" name="firstName">
        <Input />
      </Form.Item>

      <Form.Item label="Last Name" name="lastName">
        <Input />
      </Form.Item>

      <Form.Item label="Authentication Cookie" name="authCookie">
        <Input />
      </Form.Item>
    </Form>
  );
};
