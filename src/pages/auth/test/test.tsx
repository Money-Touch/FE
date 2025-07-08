import * as S from '../../../styles/auth/signup/signup.style';
import Onboarding from '../../../components/auth/test/onboarding/onboarding';
import Mbti from '../../../components/auth/test/mbti/mbti';
import Qna from '../../../components/auth/test/qna/qna';
import Loading from '../../../components/auth/test/loading/loading';
import Result from '../../../components/auth/test/result/result';
import OnboardingData from '../../../utils/auth/test/onboardingData';
import type { OnboardingItem } from '../../../types/auth/test/onboarding';
import { useState } from 'react';

const Test = () => {
  const [step, setStep] = useState<
    'onboarding' | 'mbti' | 'qna' | 'loading' | 'result'
  >('onboarding');

  const [onboardingList, setOnboardingList] = useState<OnboardingItem[]>(
    OnboardingData.map((item) => ({ ...item, checked: null })),
  );

  const handleNext = () => {
    if (step === 'onboarding') setStep('mbti');
    else if (step === 'mbti') setStep('qna');
  };

  const handleBack = () => {
    if (step === 'mbti') setStep('onboarding');
    else if (step === 'qna') setStep('mbti');
  };

  const handleLoading = () => {
    setStep('loading');
  };

  const handleResult = () => {
    setStep('result');
  };

  return (
    <S.SignupContainer className="pageContainer">
      {step === 'onboarding' && (
        <Onboarding
          onNext={handleNext}
          onboardingList={onboardingList}
          setOnboardingList={setOnboardingList}
        />
      )}
      {step === 'mbti' && <Mbti onBack={handleBack} onNext={handleNext} />}
      {step === 'qna' && <Qna onBack={handleBack} onNext={handleLoading} />}
      {step === 'loading' && <Loading onNext={handleResult} />}
      {step === 'result' && <Result />}
    </S.SignupContainer>
  );
};

export default Test;
