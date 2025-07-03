import * as S from "../../../styles/auth/signup/signup";
import Onboarding from "../../../components/auth/test/onboarding/onboarding";
import Mbti from "../../../components/auth/test/mbti/mbti";
import Qna from "../../../components/auth/test/qna/qna";
import OnboardingData from "../../../utils/auth/signup/onboardingData";
import type { OnboardingItem } from "../../../types/auth/test/onboarding";
import { useState } from "react";

const Test = () => {
    const [step, setStep] = useState<"onboarding" | "mbti" | "qna">("onboarding");
    
    const [onboardingList, setOnboardingList] = useState<OnboardingItem[]>(
        OnboardingData.map(item => ({ ...item, checked: null }))
    );

    const handleNext = () => {
        if (step === "onboarding") setStep("mbti");
        else if (step === "mbti") setStep("qna");
    };

    const handleBack = () => {
        if (step === "mbti") setStep("onboarding");
        else if (step === "qna") setStep("mbti");
    };

    return (
        <S.SignupContainer className="pageContainer">
            {step === "onboarding" && <Onboarding onNext={handleNext} onboardingList={onboardingList} setOnboardingList={setOnboardingList} />}
            {step === "mbti" && <Mbti onBack={handleBack} onNext={handleNext} />}
            {step === "qna" && <Qna onBack={handleBack} />}
        </S.SignupContainer>
    )
}

export default Test;