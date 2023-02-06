import { useApiUrl } from '@pankod/refine-core';
import type { FormProps } from '@pankod/refine-antd';
import {
  Form,
  Input,
  Upload,
  Select,
  getValueFromEvent,
  DatePicker,
  Radio,
  Row,
  Col,
  Space,
  Avatar,
  Typography,
} from '@pankod/refine-antd';
import dayjs, { Dayjs } from 'dayjs';

import { roleOptions } from './roleOptions';
import { IUser } from '../../interfaces';

type Props = {
  formProps: FormProps<IUser>;
};

const { Text } = Typography;
/*
images":[
  {
    "uid":"rc-upload-51t38jtcqb",
    "name":"random-image.jpg",
    "url":"https://picsum.photos/800",
    "type":"image/jpeg",
    "size":141940
  }
]
*/
export const UserForm = ({ formProps }: Props) => {
  const apiUrl = useApiUrl();

  const uploadAvatarApi = `${apiUrl}/local-files/upload-media`;
  /*
              getValueProps={(value: any) => {
                return value;
              }}

*/
  const avatar = formProps.initialValues?.avatar;

  const initialValues =
    avatar && !Array.isArray(avatar)
      ? { ...formProps.initialValues, avatar: [avatar] }
      : formProps.initialValues;

  return (
    <Form
      {...formProps}
      initialValues={initialValues}
      layout="vertical"
      onFinish={(values) => {
        let avatarId: number | null;
        const { avatar } = values as any;
        if (Array.isArray(avatar) && avatar.length) {
          avatarId = avatar[0].response?.id || null;
        } else {
          avatarId = null;
        }
        return (
          formProps.onFinish &&
          formProps.onFinish({
            ...values,
            avatarId,
          })
        );
      }}
    >
      <Row gutter={20}>
        <Col xs={24} lg={8}>
          <Form.Item label="Avatar">
            <Form.Item
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              noStyle
            >
              <Upload.Dragger
                name="file"
                action={uploadAvatarApi}
                listType="picture"
                maxCount={1}
                multiple
                style={{
                  border: 'none',
                  width: '100%',
                  background: 'none',
                }}
              >
                <Space direction="vertical" size={2}>
                  <Avatar
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                    }}
                    src="/images/user-default-img.png"
                    alt="Store Location"
                  />
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: '16px',
                      marginTop: '8px',
                    }}
                  >
                    Add user picture
                  </Text>
                  <Text style={{ fontSize: '12px' }}>must be 480x480 px</Text>
                </Space>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} lg={16}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input E-mail!',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Roles"
            name="roles"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select mode="multiple" options={roleOptions} />
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            label="Registered With Google"
            name="isRegisteredWithGoogle"
          >
            <Radio.Group
              options={[
                { label: 'yes', value: true },
                { label: 'no', value: false },
              ]}
            />
          </Form.Item>

          <Form.Item label="Google Id" name="googleId">
            <Input />
          </Form.Item>

          <Form.Item
            label="Registered With Facebook"
            name="isRegisteredWithFacebook"
          >
            <Radio.Group
              options={[
                { label: 'yes', value: true },
                { label: 'no', value: false },
              ]}
            />
          </Form.Item>

          <Form.Item label="Facebook Id" name="facebookId">
            <Input />
          </Form.Item>

          <Form.Item
            label="Verification Sent At"
            name="verificationCodeSentAt"
            getValueProps={(
              value: string | number | Date | Dayjs | null | undefined,
            ) => ({
              value: value ? dayjs(value) : '',
            })}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Verified At"
            name="verifiedAt"
            getValueProps={(
              value: string | number | Date | Dayjs | null | undefined,
            ) => ({
              value: value ? dayjs(value) : '',
            })}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
