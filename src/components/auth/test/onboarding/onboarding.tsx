import * as T from "../../../../styles/auth/test/test";
import colors from "../../../../styles/common/colors";
import ListOnboarding from "./list-onboarding";
import type { OnboardingItem } from "../../../../types/auth/test/onboarding";
import { useOnboarding } from "../../../../hooks/auth/test/useOnboarding";
import { useOnboardingMutation } from "../../../../hooks/auth/test/useOnboardingMutation";
import { getOnboarding } from "../../../../utils/auth/test/getOnboarding";
import * as S from "../../../../styles/auth/signup/signup";

interface OnboardingProps {
    onNext: () => void;
    onboardingList: OnboardingItem[];
    setOnboardingList: React.Dispatch<React.SetStateAction<OnboardingItem[]>>;
}


const Onboarding = ({ onNext, onboardingList, setOnboardingList }: OnboardingProps) => {
    const { handleSelect, isComplete } = useOnboarding(onboardingList, setOnboardingList);
    const { mutate } = useOnboardingMutation();

    const handleSubmit = () => {
        const payload = getOnboarding(onboardingList);

        mutate(payload, {
            onSuccess: (data) => {
                console.log("응답: ", data);
                onNext();
            },
            onError: () => {
                alert("제출 중 오류가 발생했습니다.");
            },
        });
  };

    return (
        <S.AgreeContainer>
            <T.OnboardingTopContainer>
                <T.OnboardingP>안녕하세요!</T.OnboardingP>
                <T.OnboardingP style={{ fontSize: "2rem", color: colors.G1, lineHeight: "2.8rem" }}>
                    당신의 <span style={{ color: colors.mainColor1 }}>소비 습관</span>을 파악하기 위한<br />
                    간단한 질문 몇 가지에 답해주세요.
                </T.OnboardingP>
            </T.OnboardingTopContainer>

            <ListOnboarding onboardingList={onboardingList} onSelect={handleSelect} />

            <S.BottomContainer style={{ marginTop: "3.7rem" }}>
                <S.NextButton onClick={handleSubmit} active={isComplete} disabled={!isComplete}>완료</S.NextButton>
            </S.BottomContainer>
        </S.AgreeContainer>
    )
}

export default Onboarding;