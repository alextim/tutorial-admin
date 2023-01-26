import { useCallback, useState } from "react";
import { Button, DeleteButton, Dropdown, MenuProps } from "@pankod/refine-antd";
import update from 'immutability-helper';

import { ParserType } from "../../../interfaces/parser-type.enum";

import { ParserList } from "./parsers";
import { parserTitle } from "./parsers/parser-constants";
import { Item } from "./parsers/ParserList";

const itemStyles: React.CSSProperties = {
  position: 'relative',
  padding: '10px 15px',
  fontSize: '20px',
  border: '1px solid #f9fafa',
  background: '#f9fafa',
  cursor: 'pointer',
  width: '100%',
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

const parserTypeMenu: MenuProps = {
  items: Object.entries(parserTitle).map(([key, label]) => ({
    key,
    label,
    onClick: (info: any) => {
      info.domEvent.stopPropagation();
      console.log(info)
      console.log(key)
    },
  })),
};

export const SelectorItem: React.FC<Props> = ({ id, name, selector, onEdit, resource, collapseIcon, handler }) => {
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

    const moveParserItem = useCallback((dragIndex: number, hoverIndex: number) => {
      setParsers((prevItems) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex] as Item],
          ],
        }),
      );
    }, []);

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
        <div style={itemStyles}>
          {handler}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {collapseIcon}
            <div style={{}}>{id}</div>
            <div style={{}}> {name}</div>
            <div style={{}}>{selector}</div>
          <div style={{ marginLeft: 'auto' }}><ParserList items={parsers} onMove={moveParserItem} onDelete={removeParserItem} /></div>
            <div style={{ marginLeft: 'auto' }}>
              <Dropdown
                menu={parserTypeMenu}
                trigger={['click']}
              >
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
