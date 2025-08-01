import React from 'react';
import * as M from '../../../styles/home/modal.style';
import type { ProcessedDataItem } from '../../../types/home/statistics';

interface ModalProps {
  items: ProcessedDataItem[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ items, onClose }) => {
  const allPercentagesAreIntegers = items.every((item) =>
    Number.isInteger(item.percentage),
  );

  return (
    <div className={M.ModalBackdrop} onClick={onClose}>
      <div className={M.ModalBox} onClick={(e) => e.stopPropagation()}>
        <ul className={M.ModalList}>
          {items.map((item) => (
            <li key={item.name} className={M.ModalItem}>
              <div className={M.LeftGroup}>
                <div
                  className={M.ColorDot()}
                  style={{ backgroundColor: item.color }}
                  aria-label={`${item.name} color dot`}
                />
                <span className={M.CategoryName}>{item.name}</span>
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
    </div>
  );
};

export default Modal;
