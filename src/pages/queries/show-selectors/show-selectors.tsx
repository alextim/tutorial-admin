import {
  IResourceComponentsProps,
  useOne,
  useMany,
  useUpdate,
  useNavigation,
  useRefineContext,
  useBreadcrumb,
  useInvalidate,
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
import { SelectorsTree, TreeNode } from './SelectorsTree';
import { useRef, useState } from 'react';
import { CreateSelectorModal } from './edit-create-selector';
import Nestable from 'react-nestable';

const { Title, Text } = Typography;

export const ShowSelectors: React.FC<IResourceComponentsProps> = () => {
  const ref = useRef<Nestable>(null);
  // const invalidate = useInvalidate();
  const { goBack, list } = useNavigation();

  const { id } = useParams<'id'>();
  const queryId = id ? +id : 0;
  const parentResource = `queries/${queryId}`;
  const resource = `${parentResource}/selectors`;

  const {
    formProps,
    modalProps,
    show: showCreateSelectorModal,
    } = useModalForm({
    action: 'create',
    resource,
    redirect: false,
  });

  /*
  if (!id) {
    return <NotFound />;
  }
  */
  const { data, isLoading, isError } = useOne<IQuery>({
    resource: 'queries',
    id: queryId,
    queryOptions: {
      enabled: !!queryId,
    },
  });

  const record = data?.data;

  const { data: selectorsData, isLoading: selectorsIsLoading } =
    useMany<ISelector>({
      resource,
      ids: [],
      queryOptions: {
        enabled: !!record,
      },
    });

  const { mutate, isLoading: mutateIsLoading } = useUpdate<ISelector>();


  const buttonDisabled = isLoading || selectorsIsLoading || mutateIsLoading;
  /**
 *       headerProps={{
        backIcon: false,
      }}

 */

  const updateTree = (nodes: TreeNode[], parentId: number | undefined) => {
    for (const { id, children } of nodes) {
      console.log(parentId, id)
      mutate({
        resource: 'selectors',
        id,
        values: { parentId },
      });
      if (children) {
        updateTree(children, id);
      }
    }
  };

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
              onClick={() => {
                updateTree((ref.current?.state as any).items as TreeNode[], undefined);
                // invalidate({
                //   resource,
                //   invalidates: ["all"],
                // });
              }}
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
          ref={ref}
          queryId={queryId}
          resource={resource}
          selectors={selectorsData?.data || []}
        />
      </Show>
    </>
  );
};

