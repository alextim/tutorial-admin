import React from 'react';
import type { RegisterPageProps, RegisterFormTypes } from '@pankod/refine-core';
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Divider,
} from 'antd';
import type { LayoutProps, CardProps, FormProps } from 'antd';
import {
  useTranslate,
  useRouterContext,
  useRegister,
} from '@pankod/refine-core';

import { layoutStyles, containerStyles, titleStyles } from '../styles';
import { GoogleButton } from '../GoogleButton';

const { Title } = Typography;

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps> & {
  forgotPasswordLink?: React.ReactNode;
};

/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  forgotPasswordLink,
  formProps,
}) => {
  const [form] = Form.useForm<RegisterFormTypes>();
  const translate = useTranslate();
  const { Link } = useRouterContext();

  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>();

  const CardTitle = (
    <Title level={3} style={titleStyles}>
      {translate('pages.register.title', 'Sign up for your account')}
    </Title>
  );

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={{ borderBottom: 0 }}
      style={containerStyles}
      {...(contentProps ?? {})}
    >
      <GoogleButton />
      {/*<GoogleButton onCallback={register} text="signup_with" />*/}
      <Divider>{translate('pages.register.divider', 'or')}</Divider>
      <Form<RegisterFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => register(values)}
        requiredMark={false}
        initialValues={{
          email: 'test@a.aa',
          password: 'Abc123!!',
        }}
        {...formProps}
      >
        <Form.Item
          name="email"
          label={translate('pages.register.email', 'Email')}
          rules={[
            { required: true },
            {
              type: 'email',
              message: translate(
                'pages.register.errors.validEmail',
                'Invalid email address',
              ),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={translate('pages.register.fields.email', 'Email')}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={translate('pages.register.fields.password', 'Password')}
          rules={[{ required: true }]}
          style={{ marginBottom: '12px' }}
        >
          <Input.Password placeholder="●●●●●●●●" size="large" />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          {loginLink ?? (
            <Link to="/login" style={{ fontSize: 12 }}>
              {translate('pages.login.buttons.haveAccount', 'Have an account?')}
            </Link>
          )}

          {forgotPasswordLink ?? (
            <Link
              style={{
                fontSize: '12px',
                marginLeft: 'auto',
              }}
              to="/forgot-password"
            >
              {translate(
                'pages.login.buttons.forgotPassword',
                'Forgot password?',
              )}
            </Link>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {translate('pages.register.buttons.submit', 'Sign up')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          height: '100vh',
        }}
      >
        <Col xs={22}>
          {renderContent ? renderContent(CardContent) : CardContent}
        </Col>
      </Row>
    </Layout>
  );
};
