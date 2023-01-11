import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { HttpError, Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  Layout,
} from '@pankod/refine-mantine';
import nestjsxCrudDataProvider from '@pankod/refine-nestjsx-crud';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/reset.css';

import { authProvider } from './authProvider';

import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';
import { UserList, UserCreate, UserEdit, UserShow } from './pages/users';

import { Title } from './components/title';
import { Header } from './components/header';
// import { Sider } from './components/sider';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const userData = localStorage.getItem(import.meta.env.VITE_USER_KEY);
  if (userData) {
    request.withCredentials = true;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

function App() {
  return (
    <Refine
      dataProvider={nestjsxCrudDataProvider(import.meta.env.VITE_API_URL, axiosInstance)}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/register',
            element: <AuthPage type="register" />,
          },
          {
            path: '/forgot-password',
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: '/update-password',
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      authProvider={authProvider(axiosInstance)}
      DashboardPage={DashboardPage}
      LoginPage={() => (
        <AuthPage
          type="login"
          formProps={{
            initialValues: {
              email: 'wwwwww@gmail.com',
              password: '123abcA!1',
            },
          }}
        />
      )}
      resources={[
        {
          name: 'users',
          list: UserList,
          create: UserCreate,
          edit: UserEdit,
          show: UserShow,
        },
      ]}
      notificationProvider={notificationProvider}
      Title={Title}
      Header={Header}
      Layout={Layout}

      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        disableTelemetry: true,
      }}
    />
  );
}

export default App;
