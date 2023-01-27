import { useCallback } from 'react';
import { IParser } from '../../../../interfaces/IParser';

import { ParserItem } from './ParserItem';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
};

type Props = {
  items: IParser[];
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};
export const ParserList: React.FC<Props> = ({
  items,
  onMove,
  onDelete,
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
            moveItem={onMove}
            onRemove={onDelete}
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
