import {
  Form,
  Input,
  Select,
  FormProps,
  InputNumber,
} from '@pankod/refine-antd';
import { IProxy } from '../../interfaces';

import { countryOptions } from './countryOptions';

type Props = {
  formProps: FormProps<IProxy>;
};

export const ProxyForm = ({ formProps }: Props) => {
  return (
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="API token" name="token">
        <Input />
      </Form.Item>
      <Form.Item
        label="Proxy access username"
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Proxy access password"
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Limit proxy region" name="region">
        <Select defaultValue="" options={countryOptions} />
      </Form.Item>

      <Form.Item
        label="Parallel scraping job limit"
        name="parallelScrapingJobLimit"
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Host" name="host">
        <Input />
      </Form.Item>

      <Form.Item label="Port" name="port">
        <InputNumber min={0} />
      </Form.Item>
    </Form>
  );
};
