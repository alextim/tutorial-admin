import { Divider, FormProps } from '@pankod/refine-antd';
import { Form, Input, Checkbox, Typography } from '@pankod/refine-antd';

import { ParserType } from '../../../interfaces/parser-type.enum';
import { parserColor, parserTitle } from './parsers/parser-constants';

type Props = {
  formProps: FormProps;
};

const { Text, Title } = Typography;

export const ParserForm = ({ formProps }: Props) => {
  const parserType = formProps.initialValues?.parserType as ParserType;
  return (
    <Form
      {...formProps}
      layout="vertical"
    >
      {parserType && (<>
        <Divider />
        <Title level={5}>Type</Title>
        <Text style={{ color: parserColor[parserType] }}>{parserTitle[parserType]}</Text>
        <Divider />
      </>)}
      {parserType === ParserType.ReplaceText && (<>
        <Form.Item label="Pattern" name="pattern" rules={[{ max: 64 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Replacement" name="replacement" rules={[{ max: 64 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Use Regex" name="isRegex" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </>)}

            {parserType === ParserType.AddText && (<>
      <Form.Item label="Text to append" name="append" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Text to prepend" name="prepend" rules={[{ max: 64 }]}>
        <Input />
      </Form.Item>
              </>)}


      {parserType === ParserType.StripHTML && (<>    <Form.Item
        label="Strip HTML tags"
        name="stripHtmlTags"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
        <Form.Item
          label="Decode HTML entities"
          name="decodeHtmlEntities"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </>)}

      {parserType === ParserType.RemoveWhitespaces && (<>      <Form.Item
        label="Remove whitespaces"
        name="removeWhitespaces"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
        <Form.Item
          label="Remove newlines"
          name="removeNewlines"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </>)}
    </Form>
  );
};
