import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import React, { forwardRef, useState } from 'react';
import {
  DeleteButton,
  useModalForm,
  Button,
  Modal,
  CreateButton,
} from '@pankod/refine-antd';
import { HttpError } from '@pankod/refine-core';

import Nestable from 'react-nestable';
import type { Item } from 'react-nestable';

import type { ISelector } from '../../../interfaces';
import { SelectorForm } from './form';
import { buildTree } from './buildTree';
import { ParserList } from './parsers';

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
  width: '100%',
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

export const SelectorsTree = forwardRef(
  ({ queryId, resource, selectors }: Props, ref) => {
    const {
      modalProps: editModalProps,
      formProps: editFormProps,
      show: showEditSelectorModal,
    } = useModalForm<ISelector, HttpError, ISelector>({
      action: 'edit',
      resource,
      redirect: false,
      warnWhenUnsavedChanges: true,
    });

    const {
      modalProps: createModalProps,
      formProps: createFormProps,
      show: showCreateSelectorModal,
    } = useModalForm({
      action: 'create',
      resource,
      redirect: false,
    });

    const renderItem = ({
      collapseIcon,
      handler,
      item: { id, name, selector },
    }: RendererArgs) => (
      <div style={itemStyles}>
        {handler}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {collapseIcon}
          <div style={{}}>{id}</div>
          <div style={{}}> {name}</div>
          <div style={{}}>{selector}</div>
          <div style={{ marginLeft: 'auto' }}>
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
              hideText
            />
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Modal {...createModalProps} title="Create selector">
          <SelectorForm queryId={queryId} formProps={createFormProps} />
        </Modal>
        <Modal {...editModalProps} title="Edit selector">
          <SelectorForm queryId={queryId} formProps={editFormProps} />
        </Modal>
        <div>
          <CreateButton
            onClick={(e) => {
              e.preventDefault();
              showCreateSelectorModal();
            }}
          />
        </div>
        <div>
          <DndProvider backend={HTML5Backend}>
            <Nestable
              ref={ref}
              items={buildTree(
                selectors.filter(({ parentId }) => !parentId),
                selectors,
              )}
              renderItem={renderItem}
              handler={<span style={handlerStyles} />}
              onChange={(arg) => {
                console.log(arg);
              }}
            />
            <div>
              <ParserList />
              <ParserList />
             </div>
          </DndProvider>
        </div>

      </>
    );
  },
);
