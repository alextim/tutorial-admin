import type { FormProps } from '@pankod/refine-antd';
import { Form, Input, Checkbox } from '@pankod/refine-antd';

type Props = {
  formProps: FormProps;
  queryId: number;
};

export const ParserForm = ({ queryId, formProps }: Props) => {
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
      <Form.Item label="isRegex" name="isRegex" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="pattern" name="pattern" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>
      <Form.Item label="replacement" name="replacement" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>

      <Form.Item label="append" name="append" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>
      <Form.Item label="prepend" name="prepend" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="stripHtmlTags"
        name="stripHtmlTags"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label="decodeHtmlEntities"
        name="decodeHtmlEntities"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="removeWhitespaces"
        name="removeWhitespaces"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        label="removeNewlines"
        name="removeNewlines"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
    </Form>
  );
};
