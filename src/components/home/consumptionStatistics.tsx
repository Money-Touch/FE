import * as S from "../../styles/home/home.style";
import type { SpendingCategory } from "../../types/home/spending";
import { useSpendingData } from "../../hooks/home/useSpendingData";
import DonutChart from "./donutChart";
import Legend from "./legend";

// mock data
const spendingData: SpendingCategory[] = [
  { name: "배달/외식", amount: 30 },
  { name: "카페", amount: 10 },
  { name: "교통비", amount: 10 },
  { name: "쇼핑/용품", amount: 10 },
  { name: "교육", amount: 10 },
  { name: "문화생활", amount: 10 },
];

function ConsumptionStatistics() {
  const { hasSpending, processedData, topCategory } =
    useSpendingData(spendingData);

  return (
    <S.StatisticsContainer>
      <S.SectionTitle>이번 달 소비 통계</S.SectionTitle>
      <S.StatisticsSection>
        <S.ChartAndLegendWrapper>
          <S.DonutChartWrapper>
            <DonutChart data={processedData} />
          </S.DonutChartWrapper>
          <Legend data={processedData} active={hasSpending} />
        </S.ChartAndLegendWrapper>

        <S.BottomBorderBox>
          <S.BottomText>
            {hasSpending && topCategory ? (
              <>
                가장 많이 쓴 항목은{" "}
                <S.HighlightedText>{topCategory.name}</S.HighlightedText>입니다.
              </>
            ) : (
              "소비된 기록이 없습니다."
            )}
          </S.BottomText>
        </S.BottomBorderBox>
      </S.StatisticsSection>
    </S.StatisticsContainer>
  );
}

export default ConsumptionStatistics;
