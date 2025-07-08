import ItemAnswer from './item-answer';
import * as T from '../../../../styles/auth/test/test.style';

interface ListAnswerProps {
  answers: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

const ListAnswer = ({ answers, selectedIndex, onSelect }: ListAnswerProps) => {
  return (
    <T.ItemOnboardingContainer style={{ gap: '0.6rem' }}>
      {answers.map((ans, index) => (
        <ItemAnswer
          key={index}
          answer={ans}
          selected={selectedIndex === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </T.ItemOnboardingContainer>
  );
};

export default ListAnswer;
