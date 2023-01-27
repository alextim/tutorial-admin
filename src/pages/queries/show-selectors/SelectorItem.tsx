import { useCallback, useState } from 'react';
import { Button, DeleteButton, Dropdown, MenuProps } from '@pankod/refine-antd';
import update from 'immutability-helper';

import { ParserType } from '../../../interfaces/parser-type.enum';

import { ParserList } from './parsers';
import { parserTitle } from './parsers/parser-constants';
import { Item } from './parsers/ParserList';

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
  id: number;
  name: string;
  selector: string;
  onEdit: (id: number) => void;

  resource: string;

  collapseIcon: React.ReactNode;
  handler: React.ReactNode;
};

export const SelectorItem: React.FC<Props> = ({
  id,
  name,
  selector,
  onEdit,
  resource,
  collapseIcon,
  handler,
}) => {
  const [parsers, setParsers] = useState<Item[]>([
    {
      id: 1,
      type: ParserType.AddText,
    },
    {
      id: 2,
      type: ParserType.RemoveWhitespaces,
    },
    {
      id: 3,
      type: ParserType.ReplaceText,
    },
    {
      id: 4,
      type: ParserType.StripHTML,
    },
  ]);

  const parserTypeMenu: MenuProps = {
    items: Object.entries(parserTitle).map(([key, label]) => ({
      key,
      label,
      onClick: (info: any) => {
        info.domEvent.stopPropagation();
        const nextId =
          parsers.reduce((prev, { id }) => (id > prev ? id : prev), 0) + 1;
        setParsers((prevItems) => [
          ...prevItems,
          { id: nextId, type: key as ParserType },
        ]);
      },
    })),
  };

  const moveParserItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setParsers((prevItems) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex] as Item],
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
    <div style={itemStyle}>
      {handler}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {collapseIcon}
        <div style={fieldStyle}>{id}</div>
        <div style={fieldStyle}>{name}</div>
        <div style={fieldStyle}>{selector}</div>
        <ParserList
          items={parsers}
          onMove={moveParserItem}
          onDelete={removeParserItem}
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
              onEdit(id);
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
};
