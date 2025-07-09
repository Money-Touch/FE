import * as S from '../../styles/home/home.style';
import { useState } from 'react';
import type {
  SpendingCategory,
  ProcessedDataItem,
} from '../../types/home/spending';
import { useSpendingData } from '../../hooks/home/useSpendingData';
import DonutChart from './statistics/donutChart';
import Legend from './statistics/legend';
import Modal from './statistics/modal';

// mock data
const spendingData: SpendingCategory[] = [
  { name: '배달/외식', amount: 80 },
  { name: '카페', amount: 20 },
  { name: '고정비', amount: 20 },
  { name: '패션/쇼핑', amount: 10 },
  { name: '교육', amount: 30 },
  { name: '문화생활', amount: 20 },
  { name: '야구', amount: 70 },
  { name: '학원', amount: 0 },
];

function ConsumptionStatistics() {
  const { hasSpending, processedData, topCategory } =
    useSpendingData(spendingData);
  const [showModal, setShowModal] = useState(false);
  const [othersList, setOthersList] = useState<ProcessedDataItem[]>([]);

  const handleLegendClick = (item: (typeof processedData)[number]) => {
    if (item.isOther && item.items) {
      setOthersList(item.items);
      setShowModal(true);
    }
  };

  return (
    <S.StatisticsContainer>
      <S.SectionTitle>이번 달 소비 통계</S.SectionTitle>
      <S.StatisticsSection>
        <S.ChartAndLegendWrapper>
          <S.DonutChartWrapper>
            <DonutChart data={processedData} />
          </S.DonutChartWrapper>
          <Legend
            data={processedData}
            active={hasSpending}
            onClickItem={handleLegendClick}
          />
        </S.ChartAndLegendWrapper>

        <S.BottomBorderBox>
          <S.BottomText>
            {hasSpending && topCategory ? (
              <>
                이번 달 최다 소비 항목은{' '}
                <S.HighlightedText>{topCategory.name}</S.HighlightedText>이에요.
              </>
            ) : (
              '기록된 소비가 없어요. 손대는 순간, 돈터치 시작!'
            )}
          </S.BottomText>
        </S.BottomBorderBox>
      </S.StatisticsSection>
      {showModal && (
        <Modal items={othersList} onClose={() => setShowModal(false)} />
      )}
    </S.StatisticsContainer>
  );
}

export default ConsumptionStatistics;
