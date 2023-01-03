import { AuthPage as AntdAuthPage, AuthProps } from '@pankod/refine-antd';
import { authWrapperProps } from './authWrapperProps';
import { RenderAuthContent } from './RenderAuthContent';

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={RenderAuthContent}
      formProps={formProps}
    />
  );
};
