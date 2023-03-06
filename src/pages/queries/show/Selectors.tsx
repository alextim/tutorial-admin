import { Typography } from '@pankod/refine-antd';
import { useMany } from '@pankod/refine-core';

import type { IQuery, ISelector } from '../../../interfaces';

const { Text } = Typography;

type Props = {
  record: IQuery | undefined;
};

export const Selectors = ({ record }: Props) => {
  if (!record) {
    return <></>;
  }
  const { id } = record;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, isLoading, error, data } = useMany<ISelector>({
    resource: `queries/${id}/selectors`,
    ids: [],
  });
  if (isError) {
    return <>{(error as any).toString()}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!data?.data) {
    return <>No data</>;
  }
  return (
    <>
      {data.data.map(({ name }, i) => (
        <Text key={i}>{name}</Text>
      ))}
    </>
  );
};
