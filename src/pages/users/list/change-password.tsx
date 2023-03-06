import type { ModalProps, FormProps } from '@pankod/refine-antd';
import {
  Typography,
  Modal,
  Divider,
  Form,
  Input,
  Space,
} from '@pankod/refine-antd';

import type { ChangePasswordDto, IUser } from '../../../interfaces';
import { passwordValidator } from './password-validator';

type Props = {
  user: IUser | undefined;
  modalProps: ModalProps;
  formProps: FormProps;
};

const { Text } = Typography;

export const ChangePasswordModal = ({ user, modalProps, formProps }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <Modal {...modalProps} title="Change password">
      <Form<ChangePasswordDto> {...formProps} layout="vertical">
        <Divider />
        <Space direction="vertical">
          <Text>User Id: {user.id}</Text>
          <Text>E-mail: {user.email}</Text>
          <Text>
            Name: {user.lastName} {user.firstName}
          </Text>
        </Space>
        <Divider />
        <Form.Item
          label="Current password"
          name="currentPassword"
          hasFeedback
          rules={[{ required: true }, { validator: passwordValidator }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          hasFeedback
          rules={[
            { required: true },
            {
              validator: passwordValidator,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('currentPassword') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The current and new passwords are the same!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          hasFeedback
          rules={[
            { required: true },
            {
              validator: passwordValidator,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Password and confirmation must match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
