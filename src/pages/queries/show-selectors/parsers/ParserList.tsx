import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import { ParserType } from '../../../../interfaces/parser-type.enum';
import { ParserItem } from './ParserItem';

const containerStyle = {
  display: 'flex',
};

export interface Item {
  id: number;
  type: ParserType;
}

export const ParserList: React.FC = () => {
  {
    const [items, setItems] = useState<Item[]>([
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

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
      setItems((prevItems) =>
        update(prevItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevItems[dragIndex] as Item],
          ],
        }),
      );
    }, []);

    const removeItem = useCallback((id: number) => {
      setItems((prevItems) => {
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


    const renderItem = useCallback(
      ({ id, type }: Item, index: number) => {
        return (
          <ParserItem
            key={id}
            index={index}
            id={id}
            type={type}
            moveItem={moveItem}
            onRemove={removeItem}
          />
        );
      },
      [],
    );

    return (
      <div style={containerStyle}>{items.map((item, i) => renderItem(item, i))}</div>
    );
  }
};
