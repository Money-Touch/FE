import Header from "../../../header/header";
import SettingForm from "./settingForm";
import * as S from "../../../../styles/auth/signup/signup";

interface SettingProps {
    onNext: () => void;
}

const Setting = ({ onNext }: SettingProps) => {
    return (
        <S.AgreeContainer>
            <Header />

            <S.AgreeP>이메일과 비밀번호를<br/>설정해주세요.</S.AgreeP>

            <SettingForm onNext={onNext} />
        </S.AgreeContainer>
    )
}

export default Setting;