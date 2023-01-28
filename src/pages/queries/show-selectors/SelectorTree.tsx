import React, { forwardRef } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useModalForm, Modal, CreateButton } from '@pankod/refine-antd';
import { HttpError } from '@pankod/refine-core';

import Nestable from 'react-nestable';
import type { Item } from 'react-nestable';

import type { ISelector } from '../../../interfaces';
import { IParser } from '../../../interfaces/IParser';

import { SelectorForm } from './selector-form';
import { ParserForm } from './parser-form';
import { buildTree } from './buildTree';
import { SelectorItem } from './SelectorItem';

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

const handlerStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '10px',
  height: '100%',
  background: 'steelblue',
  cursor: 'pointer',
};

export const SelectorTree = forwardRef(
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

    const {
      modalProps: editParserModalProps,
      formProps: editParserFormProps,
      show: showEditParserModal,
    } = useModalForm<IParser, HttpError, IParser>({
      action: 'edit',
      resource: 'parsers',
      redirect: false,
      warnWhenUnsavedChanges: true,
    });

    const renderItem = ({
      collapseIcon,
      handler,
      item: { id, name, selector },
    }: RendererArgs) => (
      <SelectorItem
        queryId={queryId}
        selectorId={id}
        name={name}
        selector={selector}
        resource={resource}
        onEdit={showEditSelectorModal}
        collapseIcon={collapseIcon}
        handler={handler}
        onParserEdit={showEditParserModal}
      />
    );

    return (
      <>
        <Modal {...createModalProps} title="Create selector">
          <SelectorForm queryId={queryId} formProps={createFormProps} />
        </Modal>
        <Modal {...editModalProps} title="Edit selector">
          <SelectorForm queryId={queryId} formProps={editFormProps} />
        </Modal>
        <Modal {...editParserModalProps} title="Edit parser">
          <ParserForm formProps={editParserFormProps} />
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
          </DndProvider>
        </div>
      </>
    );
  },
);
