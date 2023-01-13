export type UploadFile = {
  name: string;
  url: string;
  size: number;
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  percent: number;
  type: string;
  uid: string;
};
