import { useState, useEffect, forwardRef } from 'react';
import {
  Space,
  CreateButton,
  DeleteButton,
  EditButton,
  useModalForm,
  Button,
  Icons,
} from '@pankod/refine-antd';
import Nestable from 'react-nestable';
import type { Item } from 'react-nestable';
import rfdc from 'rfdc';

import type { ISelector } from '../../../interfaces';
import { EditSelectorModal } from './edit-create-selector';
import { BaseKey, HttpError } from '@pankod/refine-core';

type RendererArgs = {
  collapseIcon: React.ReactNode;
  depth: number;
  handler: React.ReactNode;
  index: number;
  item: Item;
};

type Props = {
  selectors: ISelector[];
  resource: string;
  queryId: number;
};

const itemStyles: React.CSSProperties = {
  position: 'relative',
  padding: '10px 15px',
  fontSize: '20px',
  border: '1px solid #f9fafa',
  background: '#f9fafa',
  cursor: 'pointer',
};

const handlerStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '10px',
  height: '100%',
  background: 'steelblue',
  cursor: 'pointer',
};

export type TreeNode = ISelector & {
  children?: TreeNode[];
};

const buildTree = (
  sels: ISelector[],
  all: ISelector[],
): TreeNode[] =>
  sels.map((sel, i) => {
    const node: TreeNode = {
      ...sel,
    };

    const children = all.filter(({ parentId }) => parentId === sel.id);

    if (children.length === 0) {
      return node;
    }

    node.children = buildTree(children, all);
    return node;
  });

const findParent = (
  search: TreeNode,
  nodes: TreeNode[] | undefined,
  parent: TreeNode | undefined,
) => {
  if (!nodes) {
    return undefined;
  }
  if (nodes.find(({ id }) => search.id === id)) {
    return parent;
  }
  for (const n of nodes) {
    const found = findParent(search, n.children, n);
    if (found) {
      return n;
    }
  }
  return undefined;
};

const deleteNode = (node: TreeNode, all: TreeNode[]) => {
  const parent = findParent(node, all, undefined);
  delete node.children;
  if (parent?.children) {
    const index = parent.children.findIndex(({ id }) => id === node.id);
    parent.children.splice(index, 1);
  }
};

export const SelectorsTree = forwardRef((props: Props, ref) => {
  const { queryId, resource, selectors } = props;
  /*
  const [treeItems, setTreeItems] = useState<TreeNode[]>(buildTree(
    selectors.filter(({ parentId }) => !parentId),
    '', selectors
  ))
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const data = buildTree(
      selectors.filter(({ parentId }) => !parentId),
      '', selectors);
    setTreeItems(data);

  }, [selectors])
  */

  // const { name, selector, type, multiply } = item;

  const { modalProps, formProps, show: showEditSelectorModal } = useModalForm<ISelector, HttpError, ISelector>({
    action: 'edit',
    resource,
    redirect: false,
     warnWhenUnsavedChanges: true,

  });

  const renderItem = ({
    collapseIcon,
    handler,
    item: { id, name, selector },
  }: RendererArgs) => (
    <div style={itemStyles}>
      {handler}
      {collapseIcon}
      <Space>
        <div>{id}</div>
        <div>{name}</div>
        <div>{selector}</div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            showEditSelectorModal(id);
          }}
            >
                Edit
            </Button>
        <DeleteButton
          recordItemId={id}
          resourceNameOrRouteName={resource}
        />
      </Space>
    </div>
  );

  return (
    <>
      <EditSelectorModal queryId={queryId}  formProps={formProps} modalProps={modalProps} />
      <Space direction="vertical">
        <Nestable
          ref={ref}
          items={buildTree(
            selectors.filter(({ parentId }) => !parentId),
            selectors,
          )}
          renderItem={renderItem}
          handler={<span style={handlerStyles} />}
          onChange={(arg) => {
            console.log(arg)
          }}
        />
      </Space>
    </>
  );
});
