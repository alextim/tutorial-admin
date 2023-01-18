import { useState, useEffect } from 'react';
import {
  Space,
  CreateButton,
  DeleteButton,
  EditButton,
} from '@pankod/refine-antd';
import Nestable from 'react-nestable';
import type { Item } from 'react-nestable';
import rfdc from 'rfdc';

import type { ISelector } from '../../../interfaces';

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

type TreeNode = ISelector & {
  key: string;
  children?: TreeNode[];
};

const buildTree = (
  sels: ISelector[],
  parentKey: string,
  all: ISelector[],
): TreeNode[] =>
  sels.map((sel, i) => {
    const key = parentKey ? `${parentKey}-${i}` : i.toString(10);

    const node: TreeNode = {
      ...sel,
      key,
    };

    const children = all.filter(({ parentId }) => parentId === sel.id);

    if (children.length === 0) {
      return node;
    }

    node.children = buildTree(children, key, all);
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

export const SelectorsTree: React.FC<Props> = ({ resource, selectors }) => {
  console.log('resource', resource);
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

  const renderItem = ({
    collapseIcon,
    handler,
    item: { id, key, name, selector },
  }: RendererArgs) => (
    <div style={itemStyles}>
      {handler}
      {collapseIcon}
      <Space>
        <div>{id}</div>
        <div>{key}</div>
        <div>{name}</div>
        <div>{selector}</div>
        <CreateButton resource={resource} />
        <EditButton recordItemId={id} resource={resource} />
        <DeleteButton
          recordItemId={id}
          resourceNameOrRouteName={resource}
          onSuccess={() => {
            //const data = rfdc()(treeItems);
            // setTreeItems(data);
          }}
        />
      </Space>
    </div>
  );

  return (
    <Space direction="vertical">
      <Nestable
        items={buildTree(
          selectors.filter(({ parentId }) => !parentId),
          '',
          selectors,
        )}
        renderItem={renderItem}
        handler={<span style={handlerStyles} />}
      />
    </Space>
  );
};
