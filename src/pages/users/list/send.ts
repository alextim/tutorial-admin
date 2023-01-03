import { notification } from '@pankod/refine-antd';

export const sendPasswordResetToken = async (email: string, apiUrl: string) => {
  const url = `${apiUrl}/send_password_reset_token?email=${email}`;
  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    notification.success({
      message: 'Password reset',
      description: `Password reset token was sent successfully to ${email}`,
    });
  } catch (err: unknown) {
    notification.error({
      message: (err as Error).toString(),
    });
  }
};

export const sendEmailVerificationLink = async (
  email: string,
  apiUrl: string,
) => {
  const url = `${apiUrl}/send_email_verification_link?email=${email}`;
  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    notification.success({
      message: 'E-mail verification',
      description: `E-mail verification link was sent successfully to ${email}`,
    });
  } catch (err: unknown) {
    notification.error({
      message: (err as Error).toString(),
    });
  }
};
