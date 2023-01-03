import { AuthProvider } from '@pankod/refine-core';
import { notification } from '@pankod/refine-antd';
import type { AxiosInstance } from 'axios';

import { API_URL, USER_KEY } from './constants';

import { CredentialsDto, SignupDto } from './interfaces';
import { parseJwt } from './utility/parse-jwt';

export const authProvider = (axios: AxiosInstance): AuthProvider => ({
  login: async (params: any) => {
    let url: string;
    let dto: Record<string, any>;

    if (params.credential) {
      const profile = parseJwt(params.credential);
      console.log(profile);
      url = `${API_URL}/auth/login-with-google`;
      dto = {
        token: params.credential,
      };
    } else {
      url = `${API_URL}/auth/login`;
      dto = {
        email: params.email,
        password: params.password,
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const user = await response.json();
      /*
      const { status, statusText, data } = await axios.post(url, { email, password }, {
        validateStatus: function (status) {
          return status >= 200 && status < 300 || (status === 401);
        },
      });
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }


      const { user } = data;
      */

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      axios.defaults.withCredentials = true;

      return Promise.resolve();
    } catch (err: unknown) {
      console.error(err);
      return Promise.reject(err);
    }
  },
  register: async (dto: SignupDto) => {
    const url = `${API_URL}/auth/signup`;
    try {
      const { status, statusText } = await axios.post(url, dto);
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  updatePassword: async () => {
    notification.success({
      message: 'Updated Password',
      description: 'Password updated successfully',
    });
    return Promise.resolve();
  },
  forgotPassword: async ({ email }) => {
    notification.success({
      message: 'Reset Password',
      description: `Reset password link sent to "${email}"`,
    });
    return Promise.resolve();
  },
  logout: async () => {
    const url = `${API_URL}/auth/logout`;
    try {
      const { status, statusText } = await axios.get(url, {
        withCredentials: true,
      });
      if (status !== 200) {
        console.error(`${status}: ${statusText}`);
      }
      localStorage.removeItem(USER_KEY);
      axios.defaults.withCredentials = false;
      window.google?.accounts.id.revoke('', () => {
          return Promise.resolve();
      });

      return Promise.resolve();
    } catch (err: unknown) {
      console.error(err);
      return Promise.reject(err);
    }
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) {
      return Promise.reject();
    }
    try {
      const { status, statusText } = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });

      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }

      axios.defaults.withCredentials = true;
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) {
      return Promise.reject();
    }

    try {
      const { data, status, statusText } = await axios.get(
        `${API_URL}/auth/me`,
        {
          withCredentials: true,
        },
      );
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }

      const { user } = data;

      return Promise.resolve({ ...user });
    } catch (error) {
      return Promise.reject();
    }
  },
});
