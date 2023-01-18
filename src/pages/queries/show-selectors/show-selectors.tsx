import {
  IResourceComponentsProps,
  useOne,
  useMany,
  useUpdate,
  useNavigation,
  useRefineContext,
  useBreadcrumb,
} from '@pankod/refine-core';
import {
  Show,
  Divider,
  Typography,
  UrlField,
  Space,
  Button,
  Breadcrumb,
  ListButton,
  RefreshButton,
  SaveButton,
  useModalForm,
  CreateButton,
} from '@pankod/refine-antd';
import { useParams } from '@pankod/refine-react-router-v6';

import { IQuery, ISelector } from '../../../interfaces';
import { SelectorsTree } from './SelectorsTree';
import { useState } from 'react';
import { CreateSelectorModal } from './CreateSelectorModal';

const { Title, Text } = Typography;

export const ShowSelectors: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParams<'id'>();
  const queryId = id ? +id : 0;
  const { goBack, list } = useNavigation();

  const {
    formProps,
    modalProps,
    show: showCreateSelectorModal,
  } = useModalForm({
    action: 'create',
    resource: `queries/${queryId}/selectors`,
    redirect: false,
  });

  console.log('queryId=', queryId);

  /*
  if (!id) {
    return <NotFound />;
  }
  */
  const { data, isLoading, isError } = useOne<IQuery>({
    resource: 'queries',
    id: queryId || 0,
    queryOptions: {
      enabled: !!queryId,
    },
  });

  const record = data?.data;

  const parentResource = `queries/${queryId}`;
  const resource = `${parentResource}/selectors`;

  const { data: selectorsData, isLoading: selectorsIsLoading } =
    useMany<ISelector>({
      resource,
      ids: [],
      queryOptions: {
        enabled: !!record,
      },
    });

  const mutationResult = useUpdate<IQuery>();

  const { mutate, isLoading: mutateIsLoading } = mutationResult;

  const handleUpdate = (item: IQuery, status: string) => {
    mutate({ resource, id: item.id, values: { ...item, status } });
  };

  const buttonDisabled = isLoading || selectorsIsLoading || mutateIsLoading;
  /**
 *       headerProps={{
        backIcon: false,
      }}

 */
  return (
    <>
      <CreateSelectorModal
        queryId={queryId}
        modalProps={modalProps}
        formProps={formProps}
      />
      <Show
        title="Selectors"
        resource="queries"
        isLoading={isLoading || selectorsIsLoading}
        recordItemId={record?.id}
        headerButtons={
          <>
            <ListButton
              {...(buttonDisabled ? { disabled: true } : {})}
              resourceNameOrRouteName="queries"
            />
            <RefreshButton
              {...(buttonDisabled ? { disabled: true } : {})}
              resourceNameOrRouteName={resource}
              recordItemId={queryId}
            />
          </>
        }
        footerButtons={
          <Space
            key="action-buttons"
            style={{ float: 'right', marginRight: 24 }}
          >
            <SaveButton
              type="primary"
              disabled={buttonDisabled}
              onClick={() => record && handleUpdate(record, 'published')}
            />
          </Space>
        }
      >
        <Title level={4}>Id</Title>
        <Text>{record?.id}</Text>

        <Title level={4}>Name</Title>
        <Text>{record?.name}</Text>

        <Title level={4}>Start Url</Title>
        <Text>
          <UrlField value={record?.startUrl} />
        </Text>
        <CreateButton
          onClick={(e) => {
            e.preventDefault();
            showCreateSelectorModal();
          }}
        />
        <SelectorsTree
          resource={resource}
          selectors={selectorsData?.data || []}
        />
      </Show>
    </>
  );
};
