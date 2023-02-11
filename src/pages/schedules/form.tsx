import { useState } from 'react';
import {
  Form,
  Select,
  InputNumber,
  useSelect,
  Switch,
  Input,
  TimePicker,
  Row,
  Col,
} from '@pankod/refine-antd';
import type { FormProps, FormInstance } from '@pankod/refine-antd';
import dayjs from 'dayjs';

import { SchedulerType, IntervalType } from '../../interfaces';
import type {
  ICustomer,
  IProxy,
  IQuery,
  ISchedule,
  ITimezone,
  IUser,
} from '../../interfaces';

import { dailyWeekdaysOptions } from './dailyWeekdaysOptions';
import {
  acceptedHoursOptions,
  acceptedMinutesOptions,
} from './interval-options';
import { intervalTypeOptions } from './intervalTypeOptions';
import { schedulerTypeOptions } from './schedulerTypeOptions';

type Props = {
  formProps: FormProps<ISchedule>;
};

const timeFormat = 'HH:mm';

const DEFAULT_SCHEDULER_ENABLED = false;
const DEFAULT_INTERVAL = 1;
const DEFAULT_SCHEDULER_TYPE = SchedulerType.Daily;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayout2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const formItemLayoutCron = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const formItemLayoutCombo = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
};

const dailyRequired = (form: FormInstance) => ({
  required: form.getFieldValue('schedulerType') === SchedulerType.Daily,
});

const customRequired = (form: FormInstance) => ({
  required: form.getFieldValue('schedulerType') === SchedulerType.Custom,
});

export const ScheduleForm = ({ formProps }: Props) => {
  const [intervalOptions, setIntervalOptions] = useState<
    { label: number; value: number }[]
  >(
    formProps.initialValues?.intervalType === IntervalType.Hour
      ? acceptedHoursOptions
      : acceptedMinutesOptions,
  );
  const [interval, setInterval] = useState<number>(
    formProps.initialValues?.interval || DEFAULT_INTERVAL,
  );

  if (!formProps.initialValues) {
    formProps.initialValues = {};
  }

  if (!formProps.initialValues.schedulerEnabled) {
    formProps.initialValues.schedulerEnabled = DEFAULT_SCHEDULER_ENABLED;
  }
  if (!formProps.initialValues.interval) {
    formProps.initialValues.interval = DEFAULT_INTERVAL;
  }
  if (!formProps.initialValues.schedulerType) {
    formProps.initialValues.schedulerType = DEFAULT_SCHEDULER_TYPE;
  }

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

  const { selectProps: querySelectProps } = useSelect<IQuery>({
    resource: 'queries',
    optionLabel: 'name',
    defaultValue: formProps.initialValues.queryId,
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

  const { selectProps: proxySelectProps } = useSelect<IProxy>({
    resource: 'proxies',
    optionLabel: 'name',
    defaultValue: formProps.initialValues.proxyId,
    sort: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const { selectProps: timezoneSelectProps } = useSelect<ITimezone>({
    resource: 'timezones',
    optionLabel: 'code',
    defaultValue: formProps.initialValues?.timezoneId || 'UTC',
    sort: [
      {
        field: 'code',
        order: 'asc',
      },
    ],
    filters: [],
    pagination: { pageSize: 1000 },
  });

  if (!timezoneSelectProps.options) {
    timezoneSelectProps.options = [];
  }
  timezoneSelectProps.options?.push({ value: 'UTC', label: 'UTC' });

  if (!formProps.initialValues.intervalType) {
    formProps.initialValues.intervalType = IntervalType.Minute;
  }

  const handleIntervalTypeChange = (value: IntervalType) => {
    setIntervalOptions(() =>
      value === IntervalType.Hour
        ? acceptedHoursOptions
        : acceptedMinutesOptions,
    );
    setInterval(DEFAULT_INTERVAL);
  };

  const [
    minute = '*',
    hour = '*',
    dayOfMonth = '*',
    month = '*',
    dayOfWeek = '*',
  ] = formProps.initialValues.cron?.split(' ') || [];

  formProps.initialValues.dailyTime = dayjs(
    formProps.initialValues.dailyTime || '00:00',
    timeFormat,
  );

  formProps.initialValues = {
    ...formProps.initialValues,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
  };
  const schedulerType = formProps.form?.getFieldValue('schedulerType');

  return (
    <Form
      {...formProps}
      {...formItemLayout}
      layout="horizontal"
      onFinish={({
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek,
        dailyTime,
        timezoneId: timezoneIdSrc,
        ...rest
      }: any) => {
        const cron = `${minute || '*'} ${hour || '*'} ${dayOfMonth || '*'} ${
          month || '*'
        } ${dayOfWeek || '*'}`;
        const timezoneId = timezoneIdSrc === 'UTC' ? undefined : timezoneIdSrc;
        const dto = {
          cron,
          timezoneId,
          dailyTime: dayjs(dailyTime).format(timeFormat),
          ...rest,
        };
        console.log(dto);
        return formProps.onFinish && formProps.onFinish(dto);
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            {...formItemLayout2}
            label="User"
            name="userId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...userSelectProps} />
          </Form.Item>

          <Form.Item
            {...formItemLayout2}
            label="Query"
            name="queryId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...querySelectProps} />
          </Form.Item>

          <Form.Item
            {...formItemLayout2}
            label="Customer"
            name="customerId"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...customerSelectProps} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            {...formItemLayout2}
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
            {...formItemLayout2}
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
            {...formItemLayout2}
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
          <Form.Item {...formItemLayout2} label="Proxy" name="proxyId">
            <Select {...proxySelectProps} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Enable scheduler"
        name="schedulerEnabled"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        {...formItemLayoutCombo}
        label="Scheduler Time zone"
        name="timezoneId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...timezoneSelectProps} />
      </Form.Item>

      <Form.Item
        {...formItemLayoutCombo}
        label="Scheduler Type"
        name="schedulerType"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select options={schedulerTypeOptions} />
      </Form.Item>

      {schedulerType === SchedulerType.Daily && (
        <>
          <Form.Item
            label="Run a job on"
            name="dailyWeekdays"
            rules={[dailyRequired as any]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              options={dailyWeekdaysOptions}
            />
          </Form.Item>
          <Form.Item label="At" name="dailyTime" rules={[dailyRequired as any]}>
            <TimePicker format={timeFormat} />
          </Form.Item>
        </>
      )}

      {schedulerType === SchedulerType.Interval && (
        <Form.Item label="Run a job every">
          <Form.Item
            name="interval"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Select options={intervalOptions} value={interval} />
          </Form.Item>
          <Form.Item
            name="intervalType"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Select
              options={intervalTypeOptions}
              onChange={handleIntervalTypeChange}
            />
          </Form.Item>
        </Form.Item>
      )}

      {schedulerType === SchedulerType.Custom && (
        <>
          <Form.Item
            {...formItemLayoutCron}
            label="Minute"
            name="minute"
            rules={[customRequired as any]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayoutCron}
            label="Hour"
            name="hour"
            rules={[customRequired as any]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayoutCron}
            label="Day Of Month"
            name="dayOfMonth"
            rules={[customRequired as any]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayoutCron}
            label="Month"
            name="month"
            rules={[customRequired as any]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayoutCron}
            label="Day Of Week"
            name="dayOfWeek"
            rules={[customRequired as any]}
          >
            <Input />
          </Form.Item>
        </>
      )}
    </Form>
  );
};
