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
    <div className={S.LegendList}>
      {data.map((item) => {
        const cursorClass = item.isOther ? S.cursorPointer : S.cursorDefault;
        const textColorClass = active ? S.activeTextColor : S.inactiveTextColor;
        const percentageColorClass = active
          ? S.activePercentageColor
          : S.inactivePercentageColor;

        return (
          <div
            key={item.name}
            onClick={() => item.isOther && onClickItem?.(item)}
            className={`${S.LegendItemWrapper} ${cursorClass}`}
          >
            <div className={S.LegendItemLeft}>
              <div
                className={S.LegendColorDot()}
                style={{ backgroundColor: item.color }}
                aria-label={`${item.name} color dot`}
              />
              <span className={`${S.LegendText} ${textColorClass}`}>
                {item.name}
              </span>
            </div>
            <span className={`${S.LegendPercentage} ${percentageColorClass}`}>
              {active
                ? allPercentagesAreIntegers
                  ? `${item.percentage}%`
                  : `${item.percentage.toFixed(1)}%`
                : '0%'}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
