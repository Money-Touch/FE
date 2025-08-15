import * as M from '../../../styles/home/modal.style';
import type { ProcessedDataItem } from '../../../types/home/statistics';

interface ModalProps {
  items: ProcessedDataItem[];
  onClose: () => void;
}

function Modal({ items, onClose }: ModalProps) {
  const allPercentagesAreIntegers = items.every((item) =>
    Number.isInteger(item.percentage),
  );

  return (
    <>
      <div className={M.ModalBackdrop} onClick={onClose} />
      <div className={M.ModalBox} onClick={(e) => e.stopPropagation()}>
        <ul className={M.ModalList}>
          {items.map((item) => (
            <li key={item.categoryName} className={M.ModalItem}>
              <div className={M.LeftGroup}>
                <div
                  className={M.ColorDot()}
                  style={{ backgroundColor: 'var(--color-mainColor2)' }}
                  aria-label={`${item.categoryName} color dot`}
                />
                <span className={M.CategoryName}>{item.categoryName}</span>
              </div>
              <span className={M.Percentage}>
                {allPercentagesAreIntegers
                  ? `${item.percentage}%`
                  : `${item.percentage.toFixed(1)}%`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Modal;
