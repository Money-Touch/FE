import Agree from '../../../components/auth/signup/agree/agree';
import Setting from '../../../components/auth/signup/setting/setting';
import Profile from '../../../components/auth/signup/profile/profile';
import Success from '../../../components/auth/signup/success/success';
import AgreeData from '../../../utils/auth/signup/agreeData';
import type { AgreeItem } from '../../../types/auth/signup/agree';
import { useState } from 'react';
import * as S from '../../../styles/auth/signup/signup';

const Signup = () => {
  const [step, setStep] = useState<'agree' | 'setting' | 'profile' | 'success'>(
    'agree',
  );

  const [agreeList, setAgreeList] = useState<AgreeItem[]>(
    AgreeData.map((item) => ({ ...item, checked: false })),
  );

  const handleNext = () => {
    if (step === 'agree') setStep('setting');
    else if (step === 'setting') setStep('profile');
    else if (step === 'profile') setStep('success');
  };

  const handleBack = () => {
    if (step === 'setting') setStep('agree');
  };

  return (
    <S.SignupContainer className="pageContainer">
      {step === 'agree' && (
        <Agree
          onNext={handleNext}
          agreeList={agreeList}
          setAgreeList={setAgreeList}
        />
      )}
      {step === 'setting' && (
        <Setting onNext={handleNext} onBack={handleBack} />
      )}
      {step === 'profile' && <Profile onNext={handleNext} />}
      {step === 'success' && <Success />}
    </S.SignupContainer>
  );
};

export default Signup;
