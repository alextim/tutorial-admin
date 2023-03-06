import {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import update from 'immutability-helper';
import type { HttpError } from '@pankod/refine-core';
import { useApiUrl, useDelete } from '@pankod/refine-core';
import { Modal, notification, useModalForm } from '@pankod/refine-antd';

import type { IParser } from '../../../../interfaces/IParser';
import { validateResponse } from '../../../../utility/validateResponse';

import { ParserItem } from './ParserItem';
import { CreateParserForm, EditParserForm } from './form';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
};

type Props = {
  selectorId: number;
  items: IParser[];
};
// https://timmousk.com/blog/react-call-function-in-child-component/
export const ParserList = forwardRef(({ selectorId, items }: Props, ref) => {
  {
    const apiUrl = useApiUrl();
    const parsersResource = `selectors/${selectorId}/parsers`;

    const [parsers, setParsers] = useState<IParser[]>(items);

    const { mutate: mutateDelete } = useDelete();
    const removeParserItem = (id: number) => {
      mutateDelete(
        {
          resource: parsersResource,
          id,

          // mutationMode: 'pessimistic',
        },
        {
          onSuccess: ({ data: { id } }) => {
            setParsers((prev) => prev.filter((item) => item.id !== id));
          },
        },
      );
    };

    useEffect(() => {
      const reorderParsers = async () => {
        if (!parsers.length) {
          return;
        }

        const dto = {
          items: parsers.map(({ id }, sortOrder) => [id, sortOrder]),
        };
        try {
          const res = await fetch(`${apiUrl}/parsers/reorder`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(dto),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          await validateResponse(res);
        } catch (err) {
          notification.error({
            message: 'Error',
            description: (err as Error).toString(),
          });
          console.error(err);
        }
      };

      reorderParsers();
    }, [parsers, items]);

    const moveParserItem = (dragIndex: number, hoverIndex: number) => {
      setParsers((prev) =>
        update(prev, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prev[dragIndex] as IParser],
          ],
        }),
      );
    };

    const {
      modalProps: editParserModalProps,
      formProps: editParserFormProps,
      show: showEditParserModal,
    } = useModalForm<IParser, HttpError, IParser>({
      action: 'edit',
      resource: parsersResource,
      redirect: false,
      warnWhenUnsavedChanges: true,
      onMutationSuccess: ({ data }) => {
        setParsers((prev) => {
          const index = prev.findIndex(({ id }) => id === data.id);
          const updated = [...prev];
          updated.splice(index, 1, data);
          return updated;
        });
      },
    });

    const {
      modalProps: createParserModalProps,
      formProps: createParserFormProps,
      show: showCreateParserModal,
    } = useModalForm<IParser, HttpError, IParser>({
      action: 'create',
      resource: parsersResource,
      redirect: false,
      warnWhenUnsavedChanges: true,
      onMutationSuccess: ({ data }) => {
        setParsers((prev) => [...prev, data]);
      },
    });

    const renderItem = useCallback(
      ({ id, parserType }: IParser, index: number) => {
        return (
          <ParserItem
            key={id}
            index={index}
            id={id}
            type={parserType}
            moveItem={moveParserItem}
            onRemove={removeParserItem}
            onEdit={showEditParserModal}
          />
        );
      },
      [],
    );

    useImperativeHandle(ref, () => ({
      showCreateParser() {
        console.log('child function');
        showCreateParserModal();
      },
    }));

    return (
      <>
        <Modal {...editParserModalProps} title="Edit parser">
          <EditParserForm formProps={editParserFormProps} />
        </Modal>
        <Modal {...createParserModalProps} title="Create parser">
          <CreateParserForm
            formProps={createParserFormProps}
            selectorId={selectorId}
          />
        </Modal>
        <div style={containerStyle}>
          {parsers.map((parser, i) => renderItem(parser, i))}
        </div>
      </>
    );
  }
});
