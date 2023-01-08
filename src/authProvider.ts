import { AuthProvider } from '@pankod/refine-core';
import { notification } from '@pankod/refine-antd';
import type { AxiosInstance } from 'axios';

import { SigninDto, SignupDto } from './interfaces';

export const authProvider = (axiosInstance: AxiosInstance): AuthProvider => ({
  login: async (params: SigninDto) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'include',
      });

      await validateResponse(res);

      const user = await res.json();
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

      localStorage.setItem(import.meta.env.VITE_USER_KEY, JSON.stringify(user));
      axiosInstance.defaults.withCredentials = true;

      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  },

  register: async (params: SignupDto) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: 'include',
      });

      await validateResponse(res);

      notification.success({
        message: 'Sign Up',
        description: `Verification token sent to "${params.email}". Check your email to complete registration`
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },

  updatePassword: async (params: any) => {
    console.log(params);
    console.log(params.queryStrings);
    const url = `${import.meta.env.VITE_API_URL}/profile/reset_password`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: params.password,
          token: params.token,
        }),
        credentials: 'include',
      });

      await validateResponse(res);

      notification.success({
        message: 'Reset Password',
        description: 'New password set successfully',
      });
      return Promise.resolve('/login');
    } catch (err) {
      return Promise.reject(err);
    }
  },

  forgotPassword: async ({ email }) => {
    const url = `${import.meta.env.VITE_API_URL}/profile/send_password_reset_token`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      await validateResponse(res);

      notification.success({
        message: 'Reset Password',
        description: `Reset password link sent to "${email}"`,
      });
      return Promise.resolve('/login');
    } catch (err) {
      return Promise.reject(err);
    }
  },

  logout: async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
    try {
      const res = await fetch(url, {
        credentials: 'include',
      });
      await validateResponse(res);
    } catch (err) {
      console.error(err);
    }

    const user = getUser();

    localStorage.removeItem(import.meta.env.VITE_USER_KEY);
    axiosInstance.defaults.withCredentials = false;

    const email = user?.email || '';
    window.google?.accounts.id.revoke(email, () => {
      return Promise.resolve();
    });

    return Promise.resolve();
  },

  checkError: () => Promise.resolve(),

  checkAuth: () => getMe(axiosInstance),

  getPermissions: () => Promise.resolve(),

  getUserIdentity: () => getMe(axiosInstance),
});

async function getMe(axiosInstance: AxiosInstance) {
  // const userData = localStorage.getItem(import.meta.env.VITE_USER_KEY);
  // if (!userData) {
  //  return Promise.reject();
  // }
  const url = `${import.meta.env.VITE_API_URL}/auth/me`;

  try {
    const res = await fetch(url, {
      credentials: 'include',
    });

    await validateResponse(res);

    const user = await res.json();

    const userData = localStorage.getItem(import.meta.env.VITE_USER_KEY);
    if (!userData) {
      localStorage.setItem(import.meta.env.VITE_USER_KEY, JSON.stringify(user));
      axiosInstance.defaults.withCredentials = true;
    }

    return Promise.resolve({ ...user });
  } catch (err) {
    return Promise.reject(err);
  }
}

function getUser() {
  const userData = localStorage.getItem(import.meta.env.VITE_USER_KEY);
  if (!userData) {
    return undefined;
  }
  try {
    const user = JSON.parse(userData);
    return user;
  } catch {
    //
  }
}

async function validateResponse(res: Response) {
  if (res.ok) {
    return;
  }
  let message: string;
  if (res.status === 0) {
    message = 'Server unavailable';
  } else {
    const body = await res.json();
    message = body?.message || res.statusText;
  }

  throw new Error(message);
}
