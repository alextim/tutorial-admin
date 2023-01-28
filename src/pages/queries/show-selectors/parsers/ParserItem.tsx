import { useRef } from 'react';
import type { Identifier } from 'dnd-core';
import type { XYCoord } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import { ParserType } from '../../../../interfaces/parser-type.enum';
import { parserColor, parserTitle } from './parser-constants';
import { DragItemTypes } from './DragItemTypes';

const styleWrapper: React.CSSProperties = {
  position: 'relative',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '0 .5rem .5rem 0',
  cursor: 'move',
};

const styleRemoveBtn: React.CSSProperties = {
  position: 'absolute',
  border: 0,
  top: '.25rem',
  right: '.25rem',
  padding: '.25rem',
  cursor: 'pointer',
};

interface Props {
  id: any;
  type: ParserType;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: ParserType;
}

export const ParserItem: React.FC<Props> = ({
  id,
  type,
  index,
  moveItem,
  onRemove,
  onEdit,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragItemTypes.CARD,
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

      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items length
      // When dragging left, only move when the cursor is below 50%
      // When dragging right, only move when the cursor is above 50%

      // Dragging left
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging right
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
    type: DragItemTypes.CARD,
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ ...styleWrapper, opacity, backgroundColor: parserColor[type] }}
      data-handler-id={handlerId}
      onClick={(e) => {
        onEdit(id);
      }}
    >
      {parserTitle[type]}
      <button
        style={styleRemoveBtn}
        onClick={async (e) => {
          e.stopPropagation();
          await onRemove(id);
        }}
      >
        x
      </button>
    </div>
  );
};
