import * as S from '../../../../styles/auth/signup/signup.style';
import { useNavigate } from 'react-router-dom';
import { useResultQuery } from '../../../../hooks/auth/test/useResultQuery';
import ResultData from '../../../../mocks/auth/test/resultData';
import ResultForm from './resultForm';
import Header from '../../../header/header';

interface ResultProps {
  onBack: () => void;
}

const Result = ({ onBack }: ResultProps) => {
  const nickname = localStorage.getItem('nickname');
  const navigate = useNavigate();

  const { refetch } = useResultQuery({ enabled: false });

  const resultCode = localStorage.getItem('resultCode');
  const matchedResult = ResultData.find((item) => item.code === resultCode);

  const handleStart = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) {
      localStorage.removeItem('resultCode');
      localStorage.removeItem('nickname');
      navigate('/home');
    } else {
      alert('결과 조회에 실패했습니다.');
    }
  };

  return (
    <div
      className={S.AgreeContainer}
      style={{ background: matchedResult?.background }}
    >
      <Header onBack={onBack} title={`${nickname}님의 소비 MBTI는?`} />
      <ResultForm data={matchedResult} />

      <div className={`${S.BottomContainer} !mt-[8.1rem]`}>
        <button className={S.NextButton(true)} onClick={handleStart}>
          돈터치 시작하기
        </button>
      </div>
    </div>
  );
};

export default Result;
