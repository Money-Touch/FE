import * as S from '../../../../styles/auth/signup/signup.style';
import { useNavigate } from 'react-router-dom';
import { useResultQuery } from '../../../../hooks/auth/test/useResultQuery';
import ResultForm from './resultForm';

const Result = () => {
  const navigate = useNavigate();
  const { data } = useResultQuery();

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <S.AgreeContainer>
      <ResultForm data={data} />

      <S.BottomContainer style={{ marginTop: '10.7rem' }}>
        <S.NextButton active={true} onClick={handleHome}>
          돈터치 시작하기
        </S.NextButton>
      </S.BottomContainer>
    </S.AgreeContainer>
  );
};

export default Result;
