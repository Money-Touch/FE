import Agree from "../../../components/auth/signup/agree/agree";
import Setting from "../../../components/auth/signup/setting/setting";
import Profile from "../../../components/auth/signup/profile/profile";
import { useState } from "react";
import styled from "styled-components";

const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Signup = () => {
    const [step, setStep] = useState<"agree" | "setting" | "profile">("agree");

    const handleNext = () => {
        if (step === "agree") setStep("setting");
        else if (step === "setting") setStep("profile");
    };

    return (
        <SignupContainer className="pageContainer">
            {step === "agree" && <Agree onNext={handleNext} />}
            {step === "setting" && <Setting onNext={handleNext} />}
            {step === "profile" && <Profile />}
        </SignupContainer>
    );
}

export default Signup;