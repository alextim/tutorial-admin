import {
  Table,
  useTable,
  getDefaultSortOrder,
  TextField,
  useModal,
  Icons,
} from '@pankod/refine-antd';
import { useShow } from '@pankod/refine-core';

import { IQuery } from '../../interfaces';
import { CrudList } from '../../components/CrudeList';
import { QuerySelectors } from './querySelectors';
import React from 'react';

export const QueryList = () => {
  const [currentRecord, setCurrentRecord] = React.useState<IQuery>();
  const { tableProps, sorter } = useTable<IQuery>({
    initialSorter: [
      {
        field: 'id',
        order: 'desc',
      },
    ],
  });
  const { modalProps, show: showModal } = useModal();

  const { queryResult, setShowId } = useShow<IQuery>();

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  const extraMenuItems = (record: any) => [
    {
      key: 5,
      label: 'Edit Selectors',
      icon: (
        <Icons.SelectOutlined
          style={{
            color: 'blue',
            fontSize: 17,
          }}
        />
      ),
        onClick: (info: any) => {
          info.domEvent.stopPropagation();
          setCurrentRecord(record);
        showModal();
      },
    },
  ];

  return (
    <>
    <CrudList resource="queries" tableProps={tableProps} sorter={sorter} menuConfig={{ itemsFn: extraMenuItems }}>
      <Table.Column
        dataIndex="name"
        title="Name"
        sorter
        defaultSortOrder={getDefaultSortOrder('name', sorter)}
      />

      <Table.Column dataIndex="startUrl" title="Start Url" />
      <Table.Column dataIndex="requestInterval" title="Request Interval" />
      <Table.Column dataIndex="pageLoadDelay" title="Page Load Delay" />
      <Table.Column dataIndex="timeout" title="Timeout" />
      <Table.Column dataIndex="waitUntil" title="Wait Until" />

      <Table.Column
        dataIndex="proxy"
        title="Proxy"
        render={(value) => <TextField value={value?.name} />}
      />
    </CrudList>
      {currentRecord && <QuerySelectors modalProps={modalProps} record={currentRecord} />}
    </>
  );
};
