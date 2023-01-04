import { AuthProvider } from '@pankod/refine-core';
import { notification } from '@pankod/refine-antd';
import type { AxiosInstance } from 'axios';

import { API_URL, USER_KEY } from './constants';

import { SigninDto, SignupDto } from './interfaces';

export const authProvider = (axiosInstance: AxiosInstance): AuthProvider => ({
  login: async (params: SigninDto | { credential: string }) => {
    let url: string;
    let dto: Record<string, any>;

    if ('credential' in params) {
      url = `${API_URL}/auth/login/google`;
      dto = {
        token: params.credential,
      };
    } else {
      url = `${API_URL}/auth/login`;
      dto = {
        email: (params as SigninDto).email,
        password: (params as SigninDto).password,
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
        throw new Error(
          response.status === 0
            ? 'Server unavailable'
            : `${response.status}: ${response.statusText}`,
        );
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
      axiosInstance.defaults.withCredentials = true;

      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  register: async (params: SignupDto | { credential: string }) => {
    let url: string;
    let dto: Record<string, any>;
    let local = false;

    if ('credential' in params) {
      url = `${API_URL}/profile/signup/google`;
      dto = {
        token: params.credential,
      };
    } else {
      local = true;
      url = `${API_URL}/profile/signup`;
      dto = {
        email: (params as SignupDto).email,
        password: (params as SignupDto).password,
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
        throw new Error(
          response.status === 0
            ? 'Server unavailable'
            : `${response.status}: ${response.statusText}`,
        );
      }


      notification.success({
        message: 'Sign Up',
        description: local ? `Verification token sent to "${dto.email}". Check your email to complete registration` : 'Successful registration',
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
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
    const url = `${API_URL}/profile/send_password_reset_token`;
    try {
      const { status, statusText } = await axiosInstance.post(url, { email });
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }
      notification.success({
        message: 'Reset Password',
        description: `Reset password link sent to "${email}"`,
      });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },

  logout: async () => {
    const url = `${API_URL}/auth/logout`;
    try {
      const { status, statusText } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }
    } catch (err: unknown) {
      console.error(err);
    }

    const user = getUser();

    localStorage.removeItem(USER_KEY);
    axiosInstance.defaults.withCredentials = false;

    const email = user?.email || '';
    window.google?.accounts.id.revoke(email, () => {
      return Promise.resolve();
    });

    return Promise.resolve();
  },

  checkError: () => Promise.resolve(),

  checkAuth: async () => getMe(axiosInstance),

  getPermissions: () => Promise.resolve(),

  getUserIdentity: async () => getMe(axiosInstance),
});

async function getMe(axiosInstance: AxiosInstance) {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) {
    return Promise.reject();
  }

  try {
    const {
      data: user,
      status,
      statusText,
    } = await axiosInstance.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    });
    if (status !== 200) {
      throw new Error(`${status}: ${statusText}`);
    }

    return Promise.resolve({ ...user });
  } catch (error) {
    return Promise.reject();
  }
}

function getUser() {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) {
    return undefined;
  }
  try {
    const user = JSON.parse(userData);
    return user;
  } catch {}
}
