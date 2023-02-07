import { useState } from 'react';
import {
  Form,
  Select,
  FormProps,
  InputNumber,
  useSelect,
  Switch,
  Input,
} from '@pankod/refine-antd';

import { SchedulerType, IntervalType } from '../../interfaces';
import type { ICustomer, IProxy, IQuery, ISchedule, ITimezone, IUser } from '../../interfaces';

import { dailyWeekdaysOptions } from './dailyWeekdaysOptions';
import { acceptedHoursOptions, acceptedMinutesOptions } from './interval-options';
import { intervalTypeOptions } from './intervalTypeOptions';
import { schedulerTypeOptions } from './schedulerTypeOptions';

type Props = {
  formProps: FormProps<ISchedule>;
};

const padZero2 = (n: number | undefined) => {
  const s = (n || 0).toString();
  const len = s.length;
  return len >= 2 ? s  : `${'0'.repeat(2 - len)}${s}`;
};

export const ScheduleForm = ({ formProps }: Props) => {
  console.log('formProps.initialValues', formProps.initialValues);

  if (!formProps.initialValues) {
    formProps.initialValues = {};
  }

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
  const [intervalOptions, setIntervalOptions] = useState<{label: number, value: number}[]>(formProps.initialValues.intervalType === IntervalType.Hour ? acceptedHoursOptions : acceptedMinutesOptions);
  const [interval, setInterval] = useState<number>(formProps.initialValues?.interval || 1);

  const handleIntervalTypeChange = (value: IntervalType) => {
    setIntervalOptions(() => value === IntervalType.Hour ? acceptedHoursOptions : acceptedMinutesOptions);
    setInterval(1);
  }

  const [schedulerType, setSchedulerType] = useState<SchedulerType>(formProps.initialValues.schedulerType || SchedulerType.Daily);
  const [minute = '*', hour = '*', dayOfMonth = '*', month = '*', dayOfWeek = '*'] = formProps.initialValues.cron?.split(' ') || [];

  let dailyTimeHH: number;
  let dailyTimeMM: number;
  const dailyTime = formProps.initialValues?.dailyTime;
  if (dailyTime) {
    dailyTimeHH = +dailyTime.substring(0, 2);
    dailyTimeMM = +dailyTime.substring(3, 5);
  } else {
    dailyTimeHH = 0;
    dailyTimeMM = 0;
  }

  formProps.initialValues = { ...formProps.initialValues, minute, hour, dayOfMonth, month, dayOfWeek, dailyTimeHH, dailyTimeMM };

  const [cronEnabled, setCronEnabled] = useState<boolean>(!!formProps.initialValues?.cronEnabled);
  return (
    <Form {...formProps} layout="vertical" onFinish={({ minute, hour, dayOfMonth, month, dayOfWeek, timezoneId: timezoneIdSrc, dailyTimeHH, dailyTimeMM, ...rest }: any) => {
        const cron = `${minute || '*'} ${hour || '*'} ${dayOfMonth || '*'} ${month || '*'} ${dayOfWeek || '*'}`;
        const dailyTime = `${padZero2(dailyTimeHH)}:${padZero2(dailyTimeMM)}`;
      const timezoneId = timezoneIdSrc === 'UTC' ? undefined : timezoneIdSrc;
      const dto = { cron, dailyTime, timezoneId, ...rest };
      console.log(dto)
        return formProps.onFinish && formProps.onFinish(dto);
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

      <Form.Item label="Enable scheduler" name="schedulerEnabled" valuePropName="checked">
        <Switch onChange={setCronEnabled}/>
      </Form.Item>

      {cronEnabled && (<>
        <Form.Item label="Scheduler Time zone" name="timezoneId" rules={[
          {
            required: true,
          },
        ]}>
          <Select {...timezoneSelectProps} />
        </Form.Item>

        <Form.Item label="Scheduler Type" name="schedulerType" rules={[
          {
            required: true,
          },
        ]}>
          <Select options={schedulerTypeOptions} onChange={setSchedulerType} />
        </Form.Item>

        {schedulerType === SchedulerType.Daily && (<>
          <Form.Item label="Run a job on" name="dailyWeekdays">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              defaultValue={formProps.initialValues?.dailyWeekdays}
              options={dailyWeekdaysOptions}
            />
          </Form.Item>
          <Form.Item label="At">
          <Input.Group>
          <Form.Item
              name="dailyTimeHH"
              noStyle
          >
            <InputNumber min={0} max={24} formatter={padZero2} />
          </Form.Item>

          <Form.Item
              name="dailyTimeMM"
              noStyle
          >
            <InputNumber min={0} max={59} formatter={padZero2} />
            </Form.Item>
            </Input.Group>
            </Form.Item>
        </>)}

        {schedulerType === SchedulerType.Interval && (<>
          <Form.Item label="Run a job every" >
          <Form.Item name="interval" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
            <Select options={intervalOptions} value={interval} />
          </Form.Item>
          <Form.Item name="intervalType" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
            <Select options={intervalTypeOptions} onChange={handleIntervalTypeChange} />
              </Form.Item>
          </Form.Item>
        </>)}

        {schedulerType === SchedulerType.Custom && (<>
          <Form.Item
            label="Minute"
            name="minute"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hour"
            name="hour"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Day Of Month"
            name="dayOfMonth"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Month"
            name="month"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Day Of Week"
            name="dayOfWeek"
          >
            <Input />
          </Form.Item>
        </>)}
      </>)}


    </Form>
  );
};
