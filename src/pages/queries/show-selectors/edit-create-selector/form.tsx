import type { FormProps } from '@pankod/refine-antd';
import {
  Typography,
  Modal,
  Divider,
  ModalProps,
  Form,
  Input,
  Space,
  Checkbox,
  Select,
} from '@pankod/refine-antd';
import { selectorTypeOptions } from '../selectorTypeOptions';


type Props = {
  formProps: FormProps;
  queryId: number;
};

export const SelectorForm = ({
  queryId,
  formProps,
}: Props) => {
  return (
        <Form
          {...formProps}
          layout="vertical"
          onFinish={(values) =>
            formProps.onFinish &&
            formProps.onFinish({
              ...values,
              queryId,
            })
          }
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }, { max: 20 }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Selector"
            name="selector"
            rules={[{ required: true }, { max: 200 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select options={selectorTypeOptions} />
          </Form.Item>
          <Form.Item label="Multiply" name="multiply" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Form>
  );
};
