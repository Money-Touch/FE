import * as S from "../../../../styles/auth/signup/signup";
import Header from "../../../header/header";

interface QnaProps {
    onBack: () => void;
}

const Qna = ({ onBack }: QnaProps) => {
    return (
        <S.AgreeContainer>
            <Header onBack={onBack} />
        </S.AgreeContainer>
    )
}

export default Qna;