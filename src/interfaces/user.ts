import { Role } from './role.enum';
import type { UploadFile } from './UploadFile';

export interface IUser {
  id: number;

  email: string;
  roles: Role[];
  firstName?: string;
  lastName?: string;
  phone?: string;

  isRegisteredWithGoogle?: boolean;
  googleId?: string;

  isRegisteredWithFacebook?: boolean;
  facebookId?: string;

  verificationCodeSentAt?: Date;
  verifiedAt?: Date;

  avatar: UploadFile;

  createdAt: Date;
  updatedAt: Date;
}

export interface SetPasswordDto {
  password: string;
}

export interface ChangePasswordDto extends SetPasswordDto {
  currentPassword: string;
}

export type SigninDto = {
  email: string;
  password: string;
};

export type SignupDto = {
  email: string;
  password: string;
};
