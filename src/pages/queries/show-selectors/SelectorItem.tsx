import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  DeleteButton,
  Dropdown,
  Icons,
  MenuProps,
  Modal,
  notification,
  useModalForm,
} from '@pankod/refine-antd';
import { HttpError, useApiUrl } from '@pankod/refine-core';
import update from 'immutability-helper';

import { ParserType } from '../../../interfaces/parser-type.enum';
import { IParser } from '../../../interfaces/IParser';

import { ParserList } from './parsers';
import { parserTitle } from './parsers/parser-constants';
import { validateResponse } from '../../../utility/validateResponse';

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

  onParserEdit: (id: number) => void;
};

export const SelectorItem: React.FC<Props> = ({
  selectorId,
  name,
  selector,
  onEdit,
  resource,
  collapseIcon,
  handler,
  onParserEdit,
}) => {
  const [parsers, setParsers] = useState<IParser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const apiUrl = useApiUrl();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const res = await fetch(`${apiUrl}/parsers?selectorId=${selectorId}`, {
          credentials: 'include',
        });
        await validateResponse(res);

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

  useEffect(() => {
    const reorderParsers = async () => {
      if (!parsers.length) {
        return;
      }
      setIsError(false);
      setIsLoading(true);

      const items = parsers.map(({ id }, sortOrder) => [id, sortOrder]);

      try {
        const res = await fetch(`${apiUrl}/parsers/reorder`, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({ items }),
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

      setIsLoading(false);
    };

    reorderParsers();
  }, [parsers]);

  const parserTypeMenu: MenuProps = {
    items: Object.entries(parserTitle).map(([key, label]) => ({
      key,
      label,
      onClick: async (info: any) => {
        info.domEvent.stopPropagation();
        try {
          const res = await fetch(`${apiUrl}/parsers`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ parserType: key, selectorId }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          await validateResponse(res);

          const data = await res.json();
          setParsers((prevItems) => [...prevItems, data]);
        } catch (err) {
          notification.error({
            message: 'Error',
            description: (err as Error).toString(),
          });
          console.error(err);
        }
      },
    })),
  };

  const moveParserItem = (dragIndex: number, hoverIndex: number) => {
    setParsers((prevItems) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as IParser],
        ],
      }),
    );
  };

  const removeParserItem = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${apiUrl}/parsers/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      });
      await validateResponse(res);

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
    } catch (err) {
      notification.error({
        message: 'Error',
        description: (err as Error).toString(),
      });
      console.error(err);
    }
  }, []);

  return (
    <div style={itemStyle}>
      {handler}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {collapseIcon}
        <div style={fieldStyle}>{selectorId}</div>
        <div style={fieldStyle}>{name}</div>
        <div style={fieldStyle}>{selector}</div>
        <ParserList
          items={parsers}
          moveItem={moveParserItem}
          onRemove={removeParserItem}
          onEdit={onParserEdit}
        />
        <div
          style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: 'auto' }}
        >
          <Dropdown menu={parserTypeMenu} trigger={['click']}>
            <Button icon={<Icons.PlusCircleOutlined />}>parser</Button>
          </Dropdown>
          <Button
            icon={<Icons.EditOutlined />}
            onClick={(e) => {
              e.preventDefault();
              onEdit(selectorId);
            }}
          />
          <DeleteButton
            recordItemId={selectorId}
            resourceNameOrRouteName={resource}
            hideText
          />
        </div>
      </div>
    </div>
  );
};
