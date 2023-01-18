import { Modal, ModalProps, Space } from '@pankod/refine-antd';
import { useMany } from '@pankod/refine-core';

import type { IQuery, ISelector } from '../../interfaces';
import type { DataNode } from 'antd/es/tree';
import { useState, useEffect } from 'react';
import { Selectors } from './show/Selectors';

import Nestable from 'react-nestable';
import type { Item } from 'react-nestable';

type RendererArgs = {
  collapseIcon: React.ReactNode;
  depth: number;
  handler: React.ReactNode;
  index: number;
  item: Item;
};

type Props = {
  record: IQuery;
  modalProps: ModalProps;
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
export const QuerySelectors: React.FC<Props> = ({ record, modalProps }) => {
  // const [gData, setgData] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const { id } = record;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useMany<ISelector>({
    resource: `queries/${id}/selectors`,
    ids: [],
  });

  const selectors: ISelector[] = result.data?.data || [];

  const buildTree = (sels: ISelector[], parentKey: string): DataNode[] =>
    sels.map((sel, i) => {
      const key = parentKey ? `${parentKey}-${i}` : i.toString(10);
      console.debug(key);

      const node: DataNode = {
        ...sel,
        key,
      };

      const children = selectors.filter(({ parentId }) => parentId === sel.id);

      if (children.length === 0) {
        return node;
      }

      node.children = buildTree(children, key);
      return node;
    });

  const treeItems = buildTree(
    selectors.filter(({ parentId }) => !parentId),
    '',
  );

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
      </Space>
    </div>
  );

  return (
    <Modal
      {...modalProps}
      width={1000}
      footer={null}
      bodyStyle={{ minHeight: '650px' }}
    >
      <Nestable
        items={treeItems}
        renderItem={renderItem}
        handler={<span style={handlerStyles} />}
      />
    </Modal>
  );
};
