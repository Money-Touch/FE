import * as S from '../../../styles/home/home.style';
import { useState } from 'react';
import type { ProcessedDataItem } from '../../../types/home/statistics';
import { useSpendingData } from '../../../hooks/home/useSpendingData';
import DonutChart from '../statistics/donutChart';
import Legend from '../statistics/legend';
import Modal from '../statistics/modal';
import BottomText from '../statistics/bottomText';
import { mockSpendingData } from '../../../mocks/home/mockSpendingData'; // mock data

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
    <div className={S.StatisticsContainer}>
      <h2 className={S.SectionTitle}>이번 달 소비 통계</h2>
      <div className={S.StatisticsSection}>
        <div className={S.ChartAndLegendWrapper}>
          <div className={S.DonutChartWrapper}>
            <DonutChart data={processedData} />
          </div>
          <Legend
            data={processedData}
            active={hasSpending}
            onClickItem={handleLegendClick}
          />
        </div>
        <div className={S.BottomBorderBox}>
          <BottomText hasSpending={hasSpending} topCategory={topCategory} />
        </div>
      </div>
      {showModal && (
        <Modal items={othersList} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default ConsumptionStatistics;
