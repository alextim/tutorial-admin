import { useCallback } from 'react';

import { ParserType } from '../../../../interfaces/parser-type.enum';
import { ParserItem } from './ParserItem';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
};

export interface Item {
  id: number;
  type: ParserType;
}

type Props = {
  items: Item[];
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: number) => void;
};
export const ParserList: React.FC<Props> = ({ items, onMove, onDelete }) => {
  {
    const renderItem = useCallback(({ id, type }: Item, index: number) => {
      return (
        <ParserItem
          key={id}
          index={index}
          id={id}
          type={type}
          moveItem={onMove}
          onRemove={onDelete}
        />
      );
    }, []);

    return (
      <div style={containerStyle}>
        {items.map((item, i) => renderItem(item, i))}
      </div>
    );
  }
};
