import { AntdList, Modal, ModalProps } from '@pankod/refine-antd';
import { useList, useMany } from '@pankod/refine-core';

import { IQuery, ISelector } from '../../interfaces';


type Props = {
  record: IQuery;
  modalProps: ModalProps;
};
export const QuerySelectors: React.FC<Props> = ({
  record,
  modalProps
}) => {
  const { id } = record;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useMany<ISelector>({
    resource: `queries/${id}/selectors`,
    ids: [],
  });

  const renderItem = (item: ISelector) => {
        const { name, selector } = item;


        return (
            <AntdList.Item
                actions={[
                                   ]}
            >
                <AntdList.Item.Meta title={name} description={selector} />
            </AntdList.Item>
        );
    };

  return (
    <>
      <Modal
        {...modalProps}
        width={1000}
        footer={null}
        bodyStyle={{ minHeight: '650px' }}
      >
        hello
        <AntdList pagination={false}  dataSource={data?.data} renderItem={renderItem}/>
      </Modal>
</>
  );
};
