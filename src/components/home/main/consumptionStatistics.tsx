import * as S from '../../../styles/home/home.style';
import { useState } from 'react';
import type { ProcessedDataItem } from '../../../types/home/statistics';
import {
  useStatistics,
  useOtherCategories,
} from '../../../hooks/home/statistics/useStatistics';
import { useSpendingData } from '../../../hooks/home/statistics/useSpendingData';
import DonutChart from '../statistics/donutChart';
import Legend from '../statistics/legend';
import Modal from '../statistics/modal';
import BottomText from '../statistics/bottomText';

function ConsumptionStatistics() {
  const { data, isLoading, error } = useStatistics();
  const statisticsData = data?.result;
  const { data: otherCategoriesData } = useOtherCategories();

  const { hasSpending, processedData, topCategory } = useSpendingData(
    statisticsData,
    otherCategoriesData || [],
  );
  const [showModal, setShowModal] = useState(false);
  const [othersList, setOthersList] = useState<ProcessedDataItem[]>([]);

  const handleLegendClick = (item: (typeof processedData)[number]) => {
    if (item.isOther && item.items) {
      setOthersList(item.items);
      setShowModal(true);
    }
  };

  if (isLoading) return null;
  if (error || !statisticsData) return null;

  return (
    <div className={S.StatisticsContainer}>
      <h2 className={S.SectionTitle}>이번 달 소비 통계</h2>
      <div className={S.StatisticsSection}>
        <div className={S.ChartAndLegendWrapper}>
          <div className={S.DonutChartWrapper}>
            <DonutChart data={processedData} hasSpending={hasSpending} />
          </div>
          <Legend
            data={processedData}
            active={hasSpending}
            onClickItem={handleLegendClick}
          />
        </div>
        <div className={S.BottomBorderBox}>
          <BottomText
            hasSpending={hasSpending}
            topCategory={
              processedData.find((item) => item.categoryName === topCategory) ||
              null
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal items={othersList} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default ConsumptionStatistics;
