import { useState } from 'react';
import QnaForm from './qnaForm';
import * as S from '../../../../styles/auth/signup/signup.style';
import * as T from '../../../../styles/auth/test/test.style';
import Header from '../../../header/header';
import QnaData from '../../../../mocks/auth/test/qnaData';

interface QnaProps {
  onBack: () => void;
  onNext: () => void;
}

const Qna = ({ onBack, onNext }: QnaProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const handleHeaderBack = () => {
    if (pageIndex === 0) {
      onBack();
    } else {
      setPageIndex((prev) => prev - 1);
    }
  };

  return (
    <S.AgreeContainer style={{ position: 'relative' }}>
      <Header onBack={handleHeaderBack} />

      <T.NavbarContainer>
        {QnaData.map((_, idx) => (
          <T.NavbarDot key={idx} active={idx === pageIndex} />
        ))}
      </T.NavbarContainer>

      <QnaForm
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        onNext={onNext}
      />
    </S.AgreeContainer>
  );
};

export default Qna;
