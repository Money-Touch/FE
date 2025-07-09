import React from 'react';
import * as S from '../../../styles/home/modal.style';
import type { ProcessedDataItem } from '../../../types/home/spending';

interface ModalProps {
  items: ProcessedDataItem[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ items, onClose }) => {
  const allPercentagesAreIntegers = items.every((item) =>
    Number.isInteger(item.percentage),
  );

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.ModalList>
          {items.map((item) => (
            <S.ModalItem key={item.name}>
              <S.LeftGroup>
                <S.ColorDot color={item.color} />
                <S.CategoryName>{item.name}</S.CategoryName>
              </S.LeftGroup>
              <S.Percentage>
                {allPercentagesAreIntegers
                  ? `${item.percentage}%`
                  : `${item.percentage.toFixed(1)}%`}
              </S.Percentage>
            </S.ModalItem>
          ))}
        </S.ModalList>
      </S.ModalBox>
    </S.ModalBackdrop>
  );
};

export default Modal;
