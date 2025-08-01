import React, { useState } from 'react';
import * as T from '../../../../styles/auth/test/test.style';
import * as S from '../../../../styles/auth/signup/signup.style';
import QnaData from '../../../../mocks/auth/test/qnaData';
import type { QnaItem } from '../../../../types/auth/test/qna';
import { getQnaResult } from '../../../../utils/auth/test/getQnaResult';
import ListQna from './list-qna';

interface QnaFormProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onNext: () => void;
}

const QnaForm = ({ pageIndex, setPageIndex, onNext }: QnaFormProps) => {
  const [answers, setAnswers] = useState<Record<number, QnaItem>>({});
  const currentPage = QnaData[pageIndex];

  const handleSelect = (qnaId: number, type: string, choiceIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qnaId]: { qnaId, type, choiceIndex },
    }));
  };

  const handleNext = () => {
    if (pageIndex < QnaData.length - 1) {
      setPageIndex((prev) => prev + 1);
    } else {
      const resultCode = getQnaResult(answers);
      localStorage.setItem('resultCode', resultCode);
      onNext();
    }
  };

  const isPageAnswered = currentPage.qnaList.every((qna) => answers[qna.qnaId]);

  return (
    <div className={`${T.ListOnboardingContainer} !gap-0`}>
      <p className={`${T.MbtiP} !mt-[1rem] !mb-[3.4rem]`}>
        {currentPage.title}
      </p>

      <ListQna
        qnaList={currentPage.qnaList}
        answers={answers}
        type={currentPage.type}
        onSelect={handleSelect}
      />

      <div className={`${S.BottomContainer} !mt-[9.8rem]`}>
        <button
          className={S.NextButton(isPageAnswered)}
          onClick={handleNext}
          disabled={!isPageAnswered}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QnaForm;
