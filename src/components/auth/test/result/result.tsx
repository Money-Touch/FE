import * as S from '../../../../styles/auth/signup/signup.style';
import { useNavigate } from 'react-router-dom';
import { useResultQuery } from '../../../../hooks/auth/test/useResultQuery';
import ResultForm from './resultForm';
import Header from '../../../header/header';

interface ResultProps {
  onBack: () => void;
}

const Result = ({ onBack }: ResultProps) => {
  const nickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const { data } = useResultQuery();
  console.log(data);

  const handleHome = () => {
    localStorage.removeItem('resultCode');
    navigate('/home');
  };

  return (
    <div className={S.AgreeContainer}>
      <Header onBack={onBack} title={`${nickname}님의 소비 MBTI는?`} />
      <ResultForm data={data} />

      <div className={`${S.BottomContainer} !mt-[10.7rem]`}>
        <button className={S.NextButton(true)} onClick={handleHome}>
          돈터치 시작하기
        </button>
      </div>
    </div>
  );
};

export default Result;
