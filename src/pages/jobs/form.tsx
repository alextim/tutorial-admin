import {
  Form,
  Select,
  FormProps,
  InputNumber,
  useSelect,
} from '@pankod/refine-antd';

import type { ICustomer, IJob, IProxy, IQuery, IUser } from '../../interfaces';
import { jobStatusOptions } from './jobStatusOptions';

type Props = {
  formProps: FormProps<IJob>;
};

export const JobForm = ({ formProps }: Props) => {
  const { selectProps: querySelectProps } = useSelect<IQuery>({
    resource: 'queries',
    optionLabel: 'name',
    defaultValue: formProps.initialValues?.queryId,
    sort: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const { selectProps: proxySelectProps } = useSelect<IProxy>({
    resource: 'proxies',
    optionLabel: 'name',
    defaultValue: formProps.initialValues?.proxyId,
    sort: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const { selectProps: customerSelectProps } = useSelect<ICustomer>({
    resource: 'customers',
    optionLabel: 'firstName',
    defaultValue: formProps.initialValues?.customerId,
    sort: [
      {
        field: 'firstName',
        order: 'asc',
      },
    ],
  });

  const { selectProps: userSelectProps } = useSelect<IUser>({
    resource: 'users',
    optionLabel: 'email',
    defaultValue: formProps.initialValues?.userId,
    sort: [
      {
        field: 'email',
        order: 'asc',
      },
    ],
  });

  return (
    <Form {...formProps} layout="vertical"       onFinish={(values) => {
        console.log(values)
        return formProps.onFinish && formProps.onFinish(values);
      }}>
      <Form.Item
        label="Request interval"
        name="requestInterval"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={500} />
      </Form.Item>

      <Form.Item
        label="Page load delay"
        name="pageLoadDelay"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={500} />
      </Form.Item>

      <Form.Item
        label="Timeout"
        name="timeout"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Status" name="status" rules={[
          {
            required: true,
          },
        ]}>
        <Select defaultValue={formProps.initialValues?.status} options={jobStatusOptions} />
      </Form.Item>

      <Form.Item label="Query" name="queryId" rules={[
          {
            required: true,
          },
        ]}>
        <Select {...querySelectProps} />
      </Form.Item>

      <Form.Item label="Proxy" name="proxyId">
        <Select {...proxySelectProps} />
      </Form.Item>

      <Form.Item label="Customer" name="customerId" rules={[
          {
            required: true,
          },
        ]}>
        <Select {...customerSelectProps} />
      </Form.Item>

      <Form.Item label="User" name="userId" rules={[
          {
            required: true,
          },
        ]}>
        <Select {...userSelectProps} />
      </Form.Item>
    </Form>
  );
};
