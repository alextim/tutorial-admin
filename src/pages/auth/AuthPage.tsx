import { AuthPage as AntdAuthPage, AuthProps } from '@pankod/refine-antd';

import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/register/RegisterPage';

import { authWrapperProps } from './authWrapperProps';
import { RenderAuthContent } from './RenderAuthContent';
import { ForgotPasswordPage } from './components/forgot-password/forgot-password';

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  switch (type) {
    case 'login':
      return (
        <LoginPage
          wrapperProps={authWrapperProps}
          renderContent={RenderAuthContent}
          formProps={formProps}
        />
      );
    case 'register':
      return (
        <RegisterPage
          wrapperProps={authWrapperProps}
          renderContent={RenderAuthContent}
          formProps={formProps}
        />
      );
    case 'forgotPassword':
      return (
        <ForgotPasswordPage
          wrapperProps={authWrapperProps}
          renderContent={RenderAuthContent}
          formProps={formProps}
        />
      );
    default:
      return (
        <AntdAuthPage
          type={type}
          wrapperProps={authWrapperProps}
          renderContent={RenderAuthContent}
          formProps={formProps}
        />
      );
  }
};
