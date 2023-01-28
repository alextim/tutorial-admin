import { useCallback } from 'react';
import { IParser } from '../../../../interfaces/IParser';

import { ParserItem } from './ParserItem';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
};

type Props = {
  items: IParser[];
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
};

export const ParserList: React.FC<Props> = ({
  items,
  moveItem,
  onRemove,
  onEdit,
}) => {
  {
    const renderItem = useCallback(
      ({ id, parserType }: IParser, index: number) => {
        return (
          <ParserItem
            key={id}
            index={index}
            id={id}
            type={parserType}
            moveItem={moveItem}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        );
      },
      [],
    );

    return (
      <div style={containerStyle}>
        {items.map((item, i) => renderItem(item, i))}
      </div>
    );
  }
};
