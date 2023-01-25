import type { Identifier } from 'dnd-core';
import type { XYCoord } from 'react-dnd';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from './ItemTypes';
import { ParserType } from '../../../../interfaces/parser-type.enum';

const styleWrapper: React.CSSProperties = {
  position: 'relative',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginRight: '.5rem',
  cursor: 'move',
};

const styleRemoveBtn: React.CSSProperties = {
  position: 'absolute',
  border: 0,
  top: '0.25rem',
  right: '0.25.rem',
  padding: '0.25',
  cursor: 'pointer',
};

interface Props {
  id: any;
  type: ParserType;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: ParserType;
}

export const ParserItem: React.FC<Props> = ({ id, type, index, moveItem, onRemove }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [text, backgroundColor] = getAttr(type);

  return (
    <div ref={ref} style={{ ...styleWrapper, opacity, backgroundColor }} data-handler-id={handlerId}>
      {text}
      <button style={styleRemoveBtn} onClick={() => onRemove(id)}>x</button>
    </div>
  );
};

function getAttr(type: ParserType) {
  switch (type) {
    case ParserType.AddText: return ['Add Text', 'green'];
    case ParserType.ReplaceText: return ['Replace Text', 'red'];
    case ParserType.RemoveWhitespaces: return ['Remove Whitespaces', 'pink'];
    case ParserType.StripHTML: return ['Strip HTML', 'yellow'];
    default: throw new Error(`Unknown parser type ${type}`);
  }
}
