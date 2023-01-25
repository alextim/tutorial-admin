import { useRef } from 'react';
import Nestable from 'react-nestable';
import {
  IResourceComponentsProps,
  useOne,
  useMany,
  useNavigation,
  useBreadcrumb,
  useInvalidate,
  useCustomMutation,
  useApiUrl,
} from '@pankod/refine-core';
import {
  Show,
  Typography,
  UrlField,
  Space,
  Button,
  Breadcrumb,
  ListButton,
  RefreshButton,
} from '@pankod/refine-antd';
import { useParams } from '@pankod/refine-react-router-v6';

import type { IQuery, ISelector } from '../../../interfaces';
import { SelectorsTree } from './SelectorsTree';
import type { TreeNode } from './buildTree';

const { Title, Text } = Typography;

export const ShowSelectors: React.FC<IResourceComponentsProps> = () => {
  const ref = useRef<Nestable>(null);
  const { goBack, list } = useNavigation();

  const { id } = useParams<'id'>();
  const queryId = id ? +id : 0;
  const parentResource = `queries/${queryId}`;
  const resource = `${parentResource}/selectors`;
  const invalidate = useInvalidate();

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

  const apiUrl = useApiUrl();
  const { mutate, isLoading: mutateIsLoading } = useCustomMutation();

  const buttonDisabled = isLoading || selectorsIsLoading || mutateIsLoading;
  /**
 *       headerProps={{
        backIcon: false,
      }}

 */

  const items: [number, number | null][] = [];

  const populateItems = (nodes: TreeNode[], parentId: number | null) => {
    for (const { id, children } of nodes) {
      items.push([id, parentId]);
      if (children) {
        populateItems(children, id);
      }
    }
  };

  return (
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
        <Space key="action-buttons" style={{ float: 'right', marginRight: 24 }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              items.length = 0;
              populateItems(
                (ref.current?.state as any).items as TreeNode[],
                null,
              );
              console.log(items);
              mutate({
                url: `${apiUrl}/${resource}/updateTree`,
                method: 'post',
                values: {
                  items,
                },
              });
              invalidate({
                resource,
                invalidates: ['many'],
              });
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

      <SelectorsTree
        ref={ref}
        queryId={queryId}
        resource={resource}
        selectors={selectorsData?.data || []}
      />
    </Show>
  );
};
