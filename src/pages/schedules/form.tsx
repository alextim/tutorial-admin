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

const padZero2 = (s: string) => {
  const n = s.length;
  if (n >= 2) {
    return s;
  }
  return `${'0'.repeat(2 - n)}${s}`;
};

export const ScheduleForm = ({ formProps }: Props) => {
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

  if (!formProps.initialValues?.intervalType) {
    formProps.initialValues.intervalType = IntervalType.Minute;
  }
  const [intervalOptions, setIntervalOptions] = useState<{label: number, value: number}[]>(formProps.initialValues.intervalType === IntervalType.Hour ? acceptedHoursOptions : acceptedMinutesOptions);
  const [interval, setInterval] = useState<number>(formProps.initialValues?.interval || 1);

  const handleIntervalTypeChange = (value: IntervalType) => {
    setIntervalOptions(() => value === IntervalType.Hour ? acceptedHoursOptions : acceptedMinutesOptions);
    setInterval(1);
  }

  const [schedulerType, setSchedulerType] = useState<SchedulerType>(formProps.initialValues?.schedulerType);
  const [minute = '*', hour = '*', dayOfMonth = '*', month = '*', dayOfWeek = '*'] = formProps.initialValues?.cron?.split(' ') || [];

  let dailyTimeHH: number;
  let dailyTimeMM: number;
  const dailyTime = formProps.initialValues?.dailyTime;
  if (dailyTime) {
    dailyTimeHH = +dailyTime.substring(0, 1);
    dailyTimeMM = +dailyTime.substring(4, 4);
  } else {
    dailyTimeHH = 0;
    dailyTimeMM = 0;
  }

  formProps.initialValues = { ...formProps.initialValues, minute, hour, dayOfMonth, month, dayOfWeek, dailyTimeHH, dailyTimeMM };

  const [cronEnabled, setCronEnabled] = useState<boolean>(!!formProps.initialValues?.cronEnabled);
  return (
    <Form {...formProps} layout="vertical" onFinish={({ minute, hour, dayOfMonth, month, dayOfWeek, timezoneId: timezoneIdSrc, dailyTimeHH, dailyTimeMM, ...rest }: any) => {
        const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        const dailyTime = `${padZero2((dailyTimeHH || '').toString())}:${padZero2((dailyTimeMM || '').toString())}`;
        const timezoneId = timezoneIdSrc === 'UTC' ? undefined : timezoneIdSrc;
        return formProps.onFinish && formProps.onFinish({ cron, dailyTime, timezoneId, ...rest });
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

      <Form.Item label="cronEnabled" name="cronEnabled">
        <Switch onChange={setCronEnabled}/>
      </Form.Item>
      {cronEnabled && (<>
        <Form.Item label="Type" name="schedulerType" rules={[
          {
            required: true,
          },
        ]}>
          <Select options={schedulerTypeOptions} onChange={setSchedulerType} />
        </Form.Item>

        <Form.Item label="Time zone" name="timezoneId" rules={[
          {
            required: true,
          },
        ]}>
          <Select {...timezoneSelectProps} />
        </Form.Item>

        {schedulerType === SchedulerType.Daily && (<>
          <Form.Item label="Daily Weekdays" name="dailyWeekdays">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              defaultValue={formProps.initialValues?.dailyWeekdays}
              options={dailyWeekdaysOptions}
            />
          </Form.Item>

          <Form.Item
            label="dailyTimeHH"
            name="dailyTimeHH"
          >
            <InputNumber min={0} max={24} />
          </Form.Item>

          <Form.Item
            label="dailyTimeMM"
            name="dailyTimeMM"
          >
            <InputNumber min={0} max={59} />
          </Form.Item>
        </>)}

        {schedulerType === SchedulerType.Interval && (<>
          <Form.Item label="Interval Type" name="intervalType" >
            <Select options={intervalTypeOptions} onChange={handleIntervalTypeChange} />
          </Form.Item>

          <Form.Item label="Interval" name="interval">
            <Select options={intervalOptions} value={interval} />
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
