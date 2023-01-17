import {
  Typography,
  Modal,
  Divider,
  ModalProps,
  Form,
  Input,
  Space,
  FormProps,
  Checkbox,
  Select,
} from '@pankod/refine-antd';
import { selectorTypeOptions } from './selectorTypeOptions';


type Props = {
  modalProps: ModalProps;
  formProps: FormProps;
};

const { Text } = Typography;

export const CreateSelectorModal = ({ modalProps, formProps }: Props) => {
  return (
    <Modal {...modalProps} title="Create selector">
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Selector" name="selector" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select options={selectorTypeOptions} />
        </Form.Item>
        <Form.Item label="Multiply" name="multiply" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};
