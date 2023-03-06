import { useRef } from 'react';
import { useMany } from '@pankod/refine-core';
import { Button, DeleteButton, Icons } from '@pankod/refine-antd';

import type { IParser } from '../../../interfaces/IParser';
import { ParserList } from './parsers';

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
  selectorId,
  name,
  selector,
  onEdit,
  resource,
  collapseIcon,
  handler,
}) => {
  const ref = useRef();
  const parsersResource = `selectors/${selectorId}/parsers`;

  const { isError, error, isLoading, data } = useMany<IParser>({
    resource: parsersResource,
    ids: [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{(error as any).toString()}</div>;
  }

  return (
    <div style={itemStyle}>
      {handler}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {collapseIcon}
        <div style={fieldStyle}>{selectorId}</div>
        <div style={fieldStyle}>{name}</div>
        <div style={fieldStyle}>{selector}</div>
        <ParserList
          ref={ref}
          selectorId={selectorId}
          items={data?.data || []}
        />
        <div
          style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: 'auto' }}
        >
          <Button
            icon={<Icons.PlusCircleOutlined />}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                (ref.current as any).showCreateParser();
              }
            }}
          >
            parser
          </Button>
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
