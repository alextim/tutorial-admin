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

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UploadFile {
  name: string;
  url: string;
  size: number;
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  percent: number;
  type: string;
  uid: string;
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
