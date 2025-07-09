import ListAnswer from './list-answer';
import * as T from '../../../../styles/auth/test/test.style';
import colors from '../../../../styles/common/colors';

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
    <T.ItemOnboardingContainer style={{ gap: '0.7rem' }}>
      <T.OnboardingP style={{ color: colors.G1, fontSize: '1.8rem' }}>
        Q{qnaId}. {question}
      </T.OnboardingP>
      <ListAnswer
        answers={answerList}
        selectedIndex={selectedIndex}
        onSelect={onSelectAnswer}
      />
    </T.ItemOnboardingContainer>
  );
};

export default ItemQna;
