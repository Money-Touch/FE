import * as M from '../../../styles/home/modal.style';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

export default function Modal({
  onConfirm,
  onCancel,
  text,
}: ConfirmModalProps) {
  return (
    <M.ModalBackdrop>
      <M.ModalContent>
        <M.ModalText>{text}</M.ModalText>
        <M.ModalDivider />
        <M.ModalButtons>
          <M.ModalButtonYes onClick={onConfirm}>네</M.ModalButtonYes>
          <M.ModalDividerVertical />
          <M.ModalButtonNo onClick={onCancel}>아니요</M.ModalButtonNo>
        </M.ModalButtons>
      </M.ModalContent>
    </M.ModalBackdrop>
  );
}
