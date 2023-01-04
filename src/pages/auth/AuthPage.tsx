import { AuthPage as AntdAuthPage, AuthProps } from '@pankod/refine-antd';

import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/register/RegisterPage';

import { authWrapperProps } from './authWrapperProps';
import { RenderAuthContent } from './RenderAuthContent';

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  if (type === 'login') {
    return (<LoginPage wrapperProps={authWrapperProps}
      renderContent={RenderAuthContent}
      formProps={formProps} />)
  }
  if (type === 'register') {
    return (<RegisterPage wrapperProps={authWrapperProps}
      renderContent={RenderAuthContent}
      formProps={formProps} />)
  }
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={RenderAuthContent}
      formProps={formProps}
    />
  );
};
