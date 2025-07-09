import * as S from '../../styles/home/home.style';
import { useState } from 'react';
import type { ProcessedDataItem } from '../../types/home/statistics';
import { useSpendingData } from '../../hooks/home/useSpendingData';
import DonutChart from './statistics/donutChart';
import Legend from './statistics/legend';
import Modal from './statistics/modal';
import { mockSpendingData } from '../../mocks/home/mockSpendingData'; // mock data

function ConsumptionStatistics() {
  const { hasSpending, processedData, topCategory } =
    useSpendingData(mockSpendingData);
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
              <>
                기록된 소비가 없어요. 손대는 순간,{' '}
                <S.DescriptionText>돈터치 시작!</S.DescriptionText>
              </>
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
