import * as T from "../../../../styles/auth/test/test";

interface ItemAnswerProps {
  answer: string;
  selected: boolean;
  onClick: () => void;
}

const ItemAnswer = ({ answer, selected, onClick }: ItemAnswerProps) => {
    return (
        <T.AnswerButton selected={selected} onClick={onClick}>
            {answer}
        </T.AnswerButton>
    );
};

export default ItemAnswer;
