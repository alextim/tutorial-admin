import { useState } from 'react';
import { Form, Select, Divider, FormProps } from '@pankod/refine-antd';

import { ParserType } from '../../../../../interfaces/parser-type.enum';
import { parserTitle } from '../parser-constants';
import { ParserForm } from './form';

type Props = {
  formProps: FormProps;
  selectorId: number;
};

export const CreateParserForm = ({ formProps, selectorId }: Props) => {
  const [parserType, setParserType] = useState<ParserType>(
    ParserType.ReplaceText,
  );
  if (!formProps.initialValues) {
    formProps.initialValues = {};
  }
  formProps.initialValues.parserType = parserType;
  const parserTypeOptions = Object.entries(parserTitle).map(
    ([value, label]) => ({ value, label }),
  );
  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values: any) =>
        formProps.onFinish && formProps.onFinish({ ...values, selectorId })
      }
    >
      <Divider />
      <Form.Item label="Type" name="parserType">
        <Select
          options={parserTypeOptions}
          onChange={(value) => {
            setParserType(value);
          }}
        />
      </Form.Item>
      <Divider />
      <ParserForm parserType={parserType} />
    </Form>
  );
};
