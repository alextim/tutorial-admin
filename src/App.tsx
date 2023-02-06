import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { useEffect, useState } from 'react';

import { HttpError, Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  Layout,
  ConfigProvider,
  theme,
  Sider as DefaultSider,
} from '@pankod/refine-antd';
import nestjsxCrudDataProvider from '@pankod/refine-nestjsx-crud';
import routerProvider from '@pankod/refine-react-router-v6';
import '@pankod/refine-antd/dist/reset.css';
import 'react-nestable/dist/styles/index.css';

import { authProvider } from './authProvider';

import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';

import { Title } from './components/title';
import { Header } from './components/header';
import { Sider } from './components/sider';

import { CustomSider } from './components/custom-sider';
import { QuerySelectors } from './pages/queries/querySelectors';
import { ShowSelectors } from './pages/queries/show-selectors';
import { getTheme, Theme } from './components/theme';

import { UserList, UserCreate, UserEdit, UserShow } from './pages/users';
import {
  CustomerCreate,
  CustomerEdit,
  CustomerList,
  CustomerShow,
} from './pages/customers';
import { ProxyList, ProxyCreate, ProxyEdit, ProxyShow } from './pages/proxies';
import { QueryList, QueryCreate, QueryEdit, QueryShow } from './pages/queries';
import { JobList, JobCreate, JobEdit, JobShow } from './pages/jobs';
import { ScheduleList, ScheduleCreate, ScheduleEdit, ScheduleShow } from './pages/schedules';

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
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  useEffect(() => {
    setCurrentTheme(getTheme());
  }, []);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
      }}
    >
      <Refine
        dataProvider={nestjsxCrudDataProvider(
          import.meta.env.VITE_API_URL,
          axiosInstance,
        )}
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
            {
              path: '/queries/:id/selectors',
              element: <ShowSelectors />,
              layout: true,
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
                email: 'test@a.aa',
                password: 'Abc123!!',
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
          {
            name: 'customers',
            list: CustomerList,
            create: CustomerCreate,
            edit: CustomerEdit,
            show: CustomerShow,
          },
          {
            name: 'proxies',
            list: ProxyList,
            create: ProxyCreate,
            edit: ProxyEdit,
            show: ProxyShow,
          },
          {
            name: 'queries',
            list: QueryList,
            create: QueryCreate,
            edit: QueryEdit,
            // show: QueryShow,
          },
          {
            name: 'jobs',
            list: JobList,
            create: JobCreate,
            edit: JobEdit,
            show: JobShow,
          },
          {
            name: 'schedules',
            list: ScheduleList,
            create: ScheduleCreate,
            edit: ScheduleEdit,
            show: ScheduleShow,
          },
        ]}
        notificationProvider={notificationProvider}
        Title={Title}
        Header={() => (
          <Header theme={currentTheme} setTheme={setCurrentTheme} />
        )}
        Layout={Layout}
        Sider={CustomSider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          disableTelemetry: true,
        }}
      />
    </ConfigProvider>
  );
}

export default App;
