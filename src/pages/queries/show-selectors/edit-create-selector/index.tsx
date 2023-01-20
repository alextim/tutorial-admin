import { FormProps, ModalProps } from '@pankod/refine-antd';
import { Modal } from '@pankod/refine-antd';
import { SelectorForm } from './form';

type Props = {
  queryId: number;
  modalProps: ModalProps;
  formProps: FormProps;
};

export const CreateSelectorModal: React.FC<Props> = ({
  queryId,
  modalProps,
  formProps,
}) => (
  <Modal {...modalProps} title="Create selector">
    <SelectorForm queryId={queryId} formProps={formProps} />
  </Modal>
);

export const EditSelectorModal: React.FC<Props> = ({
  queryId,
  modalProps,
  formProps,
}) => {
  return (
    <Modal {...modalProps} title="Edit selector">
      <SelectorForm queryId={queryId} formProps={formProps} />
    </Modal>
  );
};
