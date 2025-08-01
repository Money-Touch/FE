import Header from '../../../header/header';
import * as S from '../../../../styles/auth/signup/signup.style';
import * as T from '../../../../styles/auth/test/test.style';
import { useNavigate } from 'react-router-dom';
import OnboardingMain from '../../../../assets/images/auth/signup/onboardingMain.png';

interface MbtiProps {
  onNext: () => void;
  onBack: () => void;
}

const Mbti = ({ onNext, onBack }: MbtiProps) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImgUrl');
    navigate('/home');
  };

  const handleQna = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImgUrl');
    onNext();
  };

  return (
    <div className={S.AgreeContainer}>
      <Header onBack={onBack} />

      <p className={T.MbtiP}>나의 소비 MBTI는 무엇일까?</p>
      <img className={T.MbtiImg} alt="mbti" src={OnboardingMain} />

      <div className={`${S.BottomContainer} !mt-[24.3rem]`}>
        <button className={S.NextButton(true)} onClick={handleQna}>
          테스트하러 가기
        </button>
        <p className={T.MbtiSkipP} onClick={handleSkip}>
          건너뛰기
        </p>
      </div>
    </div>
  );
};

export default Mbti;
