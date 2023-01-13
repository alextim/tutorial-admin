import type { GetOneResponse, QueryObserverResult } from '@pankod/refine-core';
import {
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  useSelect,
} from '@pankod/refine-antd';

import { IProxy, IQuery } from '../../interfaces';
import { waitUntilOptions } from './waitUntilOptions';

type Props = {
  formProps: FormProps<Record<string, any>>;
  queryResult: QueryObserverResult<GetOneResponse<IQuery>, unknown> | undefined;
};

export const QueryForm = ({ formProps, queryResult }: Props) => {
  const required = [{ required: true }];

  const { selectProps: proxySelectProps } = useSelect<IProxy>({
    resource: 'proxies',
    optionLabel: 'name',
    defaultValue: queryResult?.data?.data?.proxy?.id,
    sort: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  return (
    <Form
      {...formProps}
      layout="vertical"
      onFinish={(values) => {
        console.log(values);
        return (
          formProps.onFinish &&
          formProps.onFinish({
            ...values,
          })
        );
      }}
    >
      <Form.Item label="Name" name="name" rules={required}>
        <Input />
      </Form.Item>

      <Form.Item label="Start Url" name="startUrl" rules={required}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Request Interval"
        name="requestInterval"
        rules={required}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Page Load Delay<" name="pageLoadDelay" rules={required}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Timeout" name="timeout" rules={required}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Wait Until" name="waitUntil" rules={required}>
        <Select options={waitUntilOptions} />
      </Form.Item>

      <Form.Item label="Proxy" name={['proxy', 'id']} rules={required}>
        <Select {...proxySelectProps} />
      </Form.Item>
    </Form>
  );
};
