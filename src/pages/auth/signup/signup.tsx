import Agree from "../../../components/auth/signup/agree/agree";
import Setting from "../../../components/auth/signup/setting/setting";
import { useState } from "react";

const Signup = () => {
    const [step, setStep] = useState<"agree" | "setting">("agree");

    return (
        <div className="pageContainer">
            {step === "agree" && <Agree onNext={() => setStep("setting")} />}
            {step === "setting" && <Setting />}
        </div>
    )
}

export default Signup;