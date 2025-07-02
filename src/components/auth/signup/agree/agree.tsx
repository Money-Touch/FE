import Header from "../../../header/header";
import AgreeForm from "./agreeForm";
import * as S from "../../../../styles/auth/signup/signup";
import { useState } from "react";

interface AgreeProps {
    onNext: () => void;
}

const Agree = ({ onNext }: AgreeProps) => {
    const [requiredChecked, setRequiredChecked] = useState(false);

    return (
        <S.AgreeContainer>
            <Header />

            <S.AgreeP>서비스 이용 약관에<br/>동의해주세요.</S.AgreeP>
            <AgreeForm onChangeRequired={setRequiredChecked}/>

            <S.BottomContainer>
                <S.NextButton active={requiredChecked} disabled={!requiredChecked} onClick={onNext}>다음</S.NextButton>
                <S.BottomP>
                    '선택' 항목에 동의하지 않아도 서비스 이용이 가능합니다.<br/>
                    개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며,<br/>
                    동의 거부시 회원제 서비스 이용이 제한됩니다.
                </S.BottomP>
            </S.BottomContainer>
        </S.AgreeContainer>
    )
}

export default Agree;