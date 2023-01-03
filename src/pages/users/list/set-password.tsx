import {
  Typography,
  Modal,
  Divider,
  ModalProps,
  Form,
  Input,
  Space,
  FormProps,
} from '@pankod/refine-antd';

import { SetPasswordDto, IUser } from '../../../interfaces';
import { passwordValidator } from './password-validator';

type Props = {
  user: IUser | undefined;
  modalProps: ModalProps;
  formProps: FormProps;
};

const { Text } = Typography;

export const SetPasswordModal = ({ user, modalProps, formProps }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <Modal {...modalProps} title="Set password">
      <Form<SetPasswordDto> {...formProps} layout="vertical">
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
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true },
            {
              validator: passwordValidator,
            },
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
