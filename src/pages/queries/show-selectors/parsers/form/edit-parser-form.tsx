import type { FormProps } from '@pankod/refine-antd';
import { Form, Typography, Divider } from '@pankod/refine-antd';

import { ParserType } from '../../../../../interfaces/parser-type.enum';
import { parserColor, parserTitle } from '../parser-constants';
import { ParserForm } from './form';

type Props = {
  formProps: FormProps;
};

const { Text, Title } = Typography;

export const EditParserForm = ({ formProps }: Props) => {
  const parserType = formProps.initialValues?.parserType as ParserType;
  return (
    <Form {...formProps} layout="vertical">
      {parserType && (
        <>
          <Divider />
          <Title level={5}>Type</Title>
          <Text style={{ color: parserColor[parserType] }}>
            {parserTitle[parserType]}
          </Text>
          <Divider />
        </>
      )}
      <ParserForm parserType={parserType} />
    </Form>
  );
};
