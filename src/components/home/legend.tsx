import React from "react";
import * as S from "../../styles/home/home.style";
import colors from "../../styles/common/colors";

interface LegendItem {
  name: string;
  percentage: number;
  color: string;
}

interface LegendProps {
  data: LegendItem[];
  active: boolean;
}

const Legend: React.FC<LegendProps> = ({ data, active }) => {
  return (
    <S.LegendList>
      {data.map((item) => (
        <S.LegendItemWrapper key={item.name}>
          <S.LegendItemLeft>
            <S.LegendColorDot color={active ? item.color : colors.G6} />
            <S.LegendText active={active}>{item.name}</S.LegendText>
          </S.LegendItemLeft>
          <S.LegendPercentage active={active}>
            {active ? `${item.percentage.toFixed(1)}%` : "0%"}
          </S.LegendPercentage>
        </S.LegendItemWrapper>
      ))}
    </S.LegendList>
  );
};

export default Legend;
