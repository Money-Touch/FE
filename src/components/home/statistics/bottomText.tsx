import * as S from '../../../styles/home/home.style';
import type { ProcessedDataItem } from '../../../types/home/statistics';

interface BottomTextProps {
  hasSpending: boolean;
  topCategory: ProcessedDataItem | null;
}

const BottomText = ({ hasSpending, topCategory }: BottomTextProps) => {
  return (
    <p className={S.BottomText}>
      {hasSpending && topCategory ? (
        <>
          이번 달 최다 소비 항목은{' '}
          <span className={S.HighlightedText}>{topCategory.name}</span>이에요.
        </>
      ) : (
        <>
          기록된 소비가 없어요. 손대는 순간,{' '}
          <span className={S.DescriptionText}>돈터치 시작!</span>
        </>
      )}
    </p>
  );
};

export default BottomText;
