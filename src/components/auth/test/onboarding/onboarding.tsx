import * as T from '../../../../styles/auth/test/test.style';
import ListOnboarding from './list-onboarding';
import type { OnboardingItem } from '../../../../types/auth/test/onboarding';
import { useOnboarding } from '../../../../hooks/auth/test/useOnboarding';
import { useOnboardingMutation } from '../../../../hooks/auth/test/useOnboardingMutation';
import { getOnboarding } from '../../../../utils/auth/test/getOnboarding';
import type { SubmitPayload } from '../../../../types/auth/test/onboarding';
import * as S from '../../../../styles/auth/signup/signup.style';

interface OnboardingProps {
  onNext: () => void;
  onboardingList: OnboardingItem[];
  setOnboardingList: React.Dispatch<React.SetStateAction<OnboardingItem[]>>;
}

const Onboarding = ({
  onNext,
  onboardingList,
  setOnboardingList,
}: OnboardingProps) => {
  const { handleSelect, isComplete } = useOnboarding(
    onboardingList,
    setOnboardingList,
  );
  const { mutate } = useOnboardingMutation();

  const handleSubmit = () => {
    const { age, gender, job, isIncome } = getOnboarding(onboardingList);
    // console.log(onboardingData);

    const nickname = localStorage.getItem('nickname');
    const profileImgUrl = localStorage.getItem('profileImgUrl') || null;

    if (!nickname) {
      alert('닉네임이 없습니다.');
      return;
    }

    const payload: SubmitPayload = {
      age,
      gender,
      job,
      isIncome,
      nickname,
      profileImgUrl,
    };
    console.log(payload);

    mutate(payload, {
      onSuccess: (data) => {
        console.log('응답: ', data);
        localStorage.setItem('userId', data.result.userId);
        onNext();
      },
      onError: (err) => {
        alert('제출 중 오류가 발생했습니다.');
        console.log(err);
      },
    });
  };

  return (
    <div className={S.AgreeContainer}>
      <div className={T.OnboardingTopContainer}>
        <p className={T.OnboardingP}>안녕하세요!</p>
        <p
          className={`${T.OnboardingP} !text-[2rem] !text-[var(--color-G1)] !leading-[2.8rem]`}
        >
          당신의
          <span className="text-[var(--color-mainColor1)]"> 소비 습관</span>을
          파악하기 위한
          <br />
          간단한 질문 몇 가지에 답해주세요.
        </p>
      </div>

      <ListOnboarding onboardingList={onboardingList} onSelect={handleSelect} />

      <div className={`${S.BottomContainer} !mt-[3.7rem]`}>
        <button
          className={S.NextButton(isComplete)}
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
