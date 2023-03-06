import type {
  LoginPageProps,
  LoginFormTypes,
  LayoutProps,
} from '@pankod/refine-core';
import type { FormProps, CardProps } from '@pankod/refine-antd';
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
} from '@pankod/refine-antd';
import { useLogin, useTranslate, useRouterContext } from '@pankod/refine-core';

import { layoutStyles, containerStyles, titleStyles } from '../styles';
import { GoogleButton } from '../GoogleButton';

const { Title } = Typography;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage = ({
  registerLink,
  forgotPasswordLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
}: LoginProps) => {
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();
  const { mutate: login, isLoading } = useLogin();
  const { Link } = useRouterContext();

  const CardTitle = (
    <Title level={3} style={titleStyles}>
      {translate('pages.login.title', 'Sign in to your account')}
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
      {/*<GoogleButton onCallback={login}  />*/}
      <Divider>{translate('pages.login.divider', 'or')}</Divider>
      <Form<LoginFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => login(values)}
        requiredMark={false}
        initialValues={{
          remember: false,
        }}
        {...formProps}
      >
        <Form.Item
          name="email"
          label={translate('pages.login.fields.email', 'Email')}
          rules={[
            { required: true },
            {
              type: 'email',
              message: translate(
                'pages.login.errors.validEmail',
                'Invalid email address',
              ),
            },
          ]}
        >
          <Input
            size="large"
            placeholder={translate('pages.login.fields.email', 'Email')}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={translate('pages.login.fields.password', 'Password')}
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
          {registerLink ?? (
            <Link to="/register" style={{ fontSize: 12 }}>
              {translate('pages.login.buttons.noAccount', 'Need an account?')}
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
            {translate('pages.login.signin', 'Sign in')}
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
