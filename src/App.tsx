import { HttpError, Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-antd';
import '@pankod/refine-antd/dist/reset.css';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

// import dataProvider from "@pankod/refine-simple-rest";
import nestjsxCrudDataProvider from '@pankod/refine-nestjsx-crud';
import routerProvider from '@pankod/refine-react-router-v6';
import { GoogleOutlined } from '@ant-design/icons';

import { API_URL, USER_KEY } from './constants';
import { authProvider } from './authProvider';

import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';
import { UserList, UserCreate, UserEdit, UserShow } from './pages/users';

import { Title } from './components/title';
import { Header } from './components/header';
import { LoginPage } from './pages/login/LoginPage';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const userData = localStorage.getItem(USER_KEY);
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
/*
          providers={[
            {
              name: 'google',
              label: 'Sign in with Google',
              icon: <GoogleOutlined style={{ fontSize: 24, lineHeight: 0 }} />,
            },
          ]}

          */
function App() {
  const dataProvider = nestjsxCrudDataProvider(API_URL, axiosInstance);
  return (
    <Refine
      dataProvider={dataProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/register',
            element: (
              <AuthPage
                type="register"
                providers={[
                  {
                    name: 'google',
                    label: 'Sign in with Google',
                    icon: (
                      <GoogleOutlined
                        style={{
                          fontSize: 24,
                          lineHeight: 0,
                        }}
                      />
                    ),
                  },
                ]}
                formProps={{
                  initialValues: {
                    email: 'wwwwww@gmail.com',
                    password: '123abcA!1',
                  },
                }}
              />
            ),
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
        <LoginPage
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
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
      }}
      catchAll={<ErrorComponent />}
      ReadyPage={ReadyPage}
      disableTelemetry
    />
  );
}

export default App;
