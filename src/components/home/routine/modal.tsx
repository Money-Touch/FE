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
    <div className={M.ModalBackdrop}>
      <div className={M.ModalContent}>
        <p className={M.ModalText}>{text}</p>
        <div className={M.ModalDivider} />
        <div className={M.ModalButtons}>
          <button className={M.ModalButton} onClick={onConfirm}>
            네
          </button>
          <div className={M.ModalDividerVertical} />
          <button className={M.ModalButton} onClick={onCancel}>
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
