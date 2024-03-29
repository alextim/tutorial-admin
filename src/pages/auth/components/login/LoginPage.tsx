import type { LoginPageProps, LoginFormTypes } from '@pankod/refine-core';
import type { LayoutProps, FormProps, CardProps } from 'antd';
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
      {translate('pages.login.title', 'Sign in to Your Account')}
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
        <Col xs={24} xl={18}>
          {renderContent ? renderContent(CardContent) : CardContent}
        </Col>
        <Col xs={0} xl={6} style={{ position: 'relative', padding: '1rem' }}>
          <img
            src="/images/login-bg.png"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              maxWidth: 'none',
              objectFit: 'cover',
            }}
          />
          <blockquote
            style={{
              position: 'relative',
              zIndex: 20,
              fontSize: '1.5rem',
              lineHeight: 1.35,
              fontWeight: 700,
            }}
          >
            Apps scary no more
            <br />
            Orchestration too easy
            <br />
            So en-“fly”-tening
            <cite style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>
              <span>—</span>A haiku by eric-karambit-ai
            </cite>
          </blockquote>
        </Col>
      </Row>
    </Layout>
  );
};
