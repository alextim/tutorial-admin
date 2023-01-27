import { useCallback, useState, useEffect } from 'react';
import { Button, DeleteButton, Dropdown, MenuProps, Modal, useModalForm } from '@pankod/refine-antd';
import update from 'immutability-helper';

import { ParserType } from '../../../interfaces/parser-type.enum';

import { ParserList } from './parsers';
import { parserTitle } from './parsers/parser-constants';
import { IParser } from '../../../interfaces/IParser';
import { HttpError, useApiUrl } from '@pankod/refine-core';
import { ParserForm } from './parser-form';

const itemStyle: React.CSSProperties = {
  position: 'relative',
  padding: '10px 15px',
  fontSize: '20px',
  border: '1px solid #f9fafa',
  background: '#f9fafa',
  cursor: 'pointer',
  width: '100%',
};

const fieldStyle: React.CSSProperties = {
  marginRight: '1rem',
};

type Props = {
  selectorId: number;
  queryId: number;

  name: string;
  selector: string;
  onEdit: (id: number) => void;

  resource: string;

  collapseIcon: React.ReactNode;
  handler: React.ReactNode;
};

export const SelectorItem: React.FC<Props> = ({
  queryId,
  selectorId,
  name,
  selector,
  onEdit,
  resource,
  collapseIcon,
  handler,
}) => {
  const [parsers, setParsers] = useState<IParser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const apiUrl = useApiUrl();
  const url = `${apiUrl}/${resource}/${selectorId}/parsers`;

  const {
      modalProps: editParserModalProps,
      formProps: editParserFormProps,
      show: showEditParserModal,
    } = useModalForm<IParser, HttpError, IParser>({
      action: 'edit',
      resource: `${resource}/${selectorId}/parsers`,
      redirect: false,
      warnWhenUnsavedChanges: true,
    });

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await fetch(url, {
          credentials: 'include',
        });
        if (!res.ok) {
          let message: string;
          if (res.status === 0) {
            message = 'Server unavailable';
          } else {
            const body = await res.json();
            message = body?.message || res.statusText;
          }
          throw new Error(message);
        }
        const data = await res.json();
        setParsers(data);
      } catch (err) {
        setIsError(true);
        console.error(err);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [selectorId]);

  const parserTypeMenu: MenuProps = {
    items: Object.entries(parserTitle).map(([key, label]) => ({
      key,
      label,
      onClick: async (info: any) => {
        info.domEvent.stopPropagation();
        try {
          const res = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ parserType: key, selectorId }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) {
            let message: string;
            if (res.status === 0) {
              message = 'Server unavailable';
            } else {
              const body = await res.json();
              message = body?.message || res.statusText;
            }
            throw new Error(message);
          }
          const data = await res.json();
          setParsers((prevItems) => [...prevItems, data]);
        } catch (err) {
          console.error(err);
        }
      },
    })),
  };

  const moveParserItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setParsers((prevItems) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex] as IParser],
          ],
        }),
      );
    },
    [],
  );

  const removeParserItem = useCallback((id: number) => {
    setParsers((prevItems) => {
      const index = prevItems.findIndex((item) => item.id === id);
      if (index === -1) {
        console.error(`item id=${id} not found`);
        return prevItems;
      }
      const modified = [...prevItems];
      modified.splice(index, 1);
      return modified;
    });
  }, []);

  return (
    <>
      <Modal {...editParserModalProps} title="Edit parser">
        <ParserForm formProps={editParserFormProps} />
      </Modal>
    <div style={itemStyle}>
      {handler}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {collapseIcon}
        <div style={fieldStyle}>{selectorId}</div>
        <div style={fieldStyle}>{name}</div>
        <div style={fieldStyle}>{selector}</div>
        <ParserList
          items={parsers}
          onMove={moveParserItem}
          onDelete={removeParserItem}
          onEdit={showEditParserModal}
        />
        <div
          style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: 'auto' }}
        >
          <Dropdown menu={parserTypeMenu} trigger={['click']}>
            <Button>+ parser</Button>
          </Dropdown>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onEdit(selectorId);
            }}
          >
            Edit
          </Button>
          <DeleteButton
            recordItemId={selectorId}
            resourceNameOrRouteName={resource}
            hideText
          />
        </div>
      </div>
      </div>
      </>
  );
};
