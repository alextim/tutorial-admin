import { useState } from 'react';
import type { GetOneResponse, QueryObserverResult } from '@pankod/refine-core';
import type { FormProps } from '@pankod/refine-antd';
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  useSelect,
} from '@pankod/refine-antd';

import type { IProxy, IQuery } from '../../interfaces';
import { waitUntilOptions } from './waitUntilOptions';

type Props = {
  formProps: FormProps<IQuery>;
  queryResult: QueryObserverResult<GetOneResponse<IQuery>, unknown> | undefined;
};

export const QueryForm = ({ formProps, queryResult }: Props) => {
  const [disabled, setDisabled] = useState<boolean>(
    !formProps.initialValues?.isList,
  );
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
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true }, { max: 20 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Start Url"
        name="startUrl"
        rules={[{ required: true }, { max: 200 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Is List" name="isList" valuePropName="checked">
        <Checkbox
          onChange={(e) => {
            setDisabled(!e.target.checked);
          }}
        />
      </Form.Item>

      <Form.Item label="Items count" name="itemCount">
        <InputNumber min={0} disabled={disabled} />
      </Form.Item>

      <Form.Item
        label="Request Interval"
        name="requestInterval"
        rules={required}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Page Load Delay" name="pageLoadDelay" rules={required}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Timeout" name="timeout" rules={required}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Wait Until" name="waitUntil" rules={required}>
        <Select options={waitUntilOptions} />
      </Form.Item>

      <Form.Item label="Proxy" name={['proxy', 'id']}>
        <Select {...proxySelectProps} />
      </Form.Item>
    </Form>
  );
};
