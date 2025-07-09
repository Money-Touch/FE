import React from 'react';
import * as S from '../../../styles/home/home.style';
import type { ProcessedDataItem } from '../../../types/home/statistics';

interface LegendProps {
  data: ProcessedDataItem[];
  active: boolean;
  onClickItem?: (item: ProcessedDataItem) => void;
}

const Legend: React.FC<LegendProps> = ({ data, active, onClickItem }) => {
  const allPercentagesAreIntegers = data.every((item) =>
    Number.isInteger(item.percentage),
  );

  return (
    <S.LegendList>
      {data.map((item) => (
        <S.LegendItemWrapper
          key={item.name}
          onClick={() => item.isOther && onClickItem?.(item)}
          style={{ cursor: item.isOther ? 'pointer' : 'default' }}
        >
          <S.LegendItemLeft>
            <S.LegendColorDot color={item.color} />
            <S.LegendText active={active}>{item.name}</S.LegendText>
          </S.LegendItemLeft>
          <S.LegendPercentage active={active}>
            {active
              ? allPercentagesAreIntegers
                ? `${item.percentage}%`
                : `${item.percentage.toFixed(1)}%`
              : '0%'}
          </S.LegendPercentage>
        </S.LegendItemWrapper>
      ))}
    </S.LegendList>
  );
};

export default Legend;
