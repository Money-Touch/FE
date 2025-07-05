import Header from "../../../header/header";
import * as S from "../../../../styles/auth/signup/signup";
import * as T from "../../../../styles/auth/test/test";
import { useNavigate } from "react-router-dom";

interface MbtiProps {
    onNext: () => void;
    onBack: () => void;
}

const Mbti = ({ onNext, onBack }: MbtiProps) => {
    const navigate = useNavigate();

    const handleSkip = () => {
        navigate("/home");
    }

    return (
        <S.AgreeContainer>
            <Header onBack={onBack}/>

            <T.MbtiP>나의 소비 MBTI는 무엇일까?</T.MbtiP>
            <T.MbtiImgDiv />

            <S.BottomContainer style={{ marginTop: "20.7rem"}}>
                <S.NextButton active={true} onClick={onNext}>테스트하러 가기</S.NextButton>
                <T.MbtiSkipP onClick={handleSkip}>건너뛰기</T.MbtiSkipP>
            </S.BottomContainer>
        </S.AgreeContainer>
    )
}

export default Mbti;