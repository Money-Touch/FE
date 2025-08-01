import ListAnswer from './list-answer';
import * as T from '../../../../styles/auth/test/test.style';

interface ItemQnaProps {
  qnaId: number;
  question: string;
  answerList: string[];
  selectedIndex: number | null;
  onSelectAnswer: (index: number) => void;
}

const ItemQna = ({
  qnaId,
  question,
  answerList,
  selectedIndex,
  onSelectAnswer,
}: ItemQnaProps) => {
  return (
    <div className={`${T.ItemOnboardingContainer} !gap-[0.7rem]`}>
      <p className={`${T.OnboardingP} !text-[var(--color-G1)] !text-[1.8rem]`}>
        Q{qnaId}. {question}
      </p>
      <ListAnswer
        answers={answerList}
        selectedIndex={selectedIndex}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default ItemQna;
