import ItemQna from './item-qna';
import type { QnaItem } from '../../../../types/auth/test/qna';
import * as T from '../../../../styles/auth/test/test.style';

interface ListQnaProps {
  qnaList: {
    qnaId: number;
    qna: string;
    answerList: string[];
  }[];
  answers: Record<number, QnaItem>;
  type: string;
  onSelect: (qnaId: number, type: string, choiceIndex: number) => void;
}

const ListQna = ({ qnaList, answers, type, onSelect }: ListQnaProps) => {
  return (
    <div className={`${T.ListOnboardingContainer} !gap-[3rem]`}>
      {qnaList.map((qna) => (
        <ItemQna
          key={qna.qnaId}
          qnaId={qna.qnaId}
          question={qna.qna}
          answerList={qna.answerList}
          selectedIndex={answers[qna.qnaId]?.choiceIndex ?? null}
          onSelectAnswer={(index) => onSelect(qna.qnaId, type, index)}
        />
      ))}
    </div>
  );
};

export default ListQna;
