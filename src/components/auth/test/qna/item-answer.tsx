import * as T from '../../../../styles/auth/test/test.style';

interface ItemAnswerProps {
  answer: string;
  selected: boolean;
  onClick: () => void;
}

const ItemAnswer = ({ answer, selected, onClick }: ItemAnswerProps) => {
  return (
    <button className={T.AnswerButton(selected)} onClick={onClick}>
      {answer}
    </button>
  );
};

export default ItemAnswer;
