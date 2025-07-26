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
          <M.ModalButton onClick={onConfirm}>네</M.ModalButton>
          <M.ModalDividerVertical />
          <M.ModalButton onClick={onCancel}>아니요</M.ModalButton>
        </M.ModalButtons>
      </M.ModalContent>
    </M.ModalBackdrop>
  );
}
