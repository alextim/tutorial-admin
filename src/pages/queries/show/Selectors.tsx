import { Typography } from '@pankod/refine-antd';
import { useMany } from '@pankod/refine-core';

import { IQuery, ISelector } from '../../../interfaces';

const { Text } = Typography;
export const Selectors = ({ record }: { record: IQuery | undefined }) => {
  if (!record) {
    return null;
  }
  const { id } = record;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, isLoading, error, data } = useMany<ISelector>({
    resource: `queries/${id}/selectors`,
    ids: [],
  });
  if (isError) {
    return error;
  }
  if (isLoading) {
    return 'Loading...';
  }
  if (!data?.data) {
    return 'No data';
  }
  return data.data.map(({ name }, i) => <Text key={i}>{name}</Text>);
};
