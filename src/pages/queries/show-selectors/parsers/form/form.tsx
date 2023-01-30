import { Form, Input, Checkbox } from '@pankod/refine-antd';

import { ParserType } from '../../../../../interfaces/parser-type.enum';

type Props = {
  parserType: ParserType;
};

export const ParserForm = ({ parserType }: Props) => {
  return (
    <>
      {parserType === ParserType.ReplaceText && (
        <>
          <Form.Item label="Pattern" name="pattern" rules={[{ max: 64 }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Replacement"
            name="replacement"
            rules={[{ max: 64 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Use Regex" name="isRegex" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </>
      )}

      {parserType === ParserType.AddText && (
        <>
          <Form.Item label="Text to append" name="append" rules={[{ max: 64 }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Text to prepend"
            name="prepend"
            rules={[{ max: 64 }]}
          >
            <Input />
          </Form.Item>
        </>
      )}

      {parserType === ParserType.StripHTML && (
        <>
          {' '}
          <Form.Item
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
        </>
      )}

      {parserType === ParserType.RemoveWhitespaces && (
        <>
          {' '}
          <Form.Item
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
        </>
      )}
    </>
  );
};
