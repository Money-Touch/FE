import * as S from "../../../../styles/auth/signup/signup";
import Check from "../../../../assets/images/auth/signup/check.png";
import CheckClick from "../../../../assets/images/auth/signup/checkClick.png";
import ListAgree from "./list-agree";
import { useAgreeForm } from "../../../../hooks/auth/signup/useAgreeForm";
import { useEffect } from "react";

interface AgreeFormProps {
    onChangeRequired?: (isChecked: boolean) => void;
}

const AgreeForm = ({ onChangeRequired }: AgreeFormProps ) => {
    const { agreeList, allChecked, requiredChecked, toggleAll, toggleItem } = useAgreeForm();

    useEffect(() => {
        onChangeRequired?.(requiredChecked);
    }, [requiredChecked]);

    return (
        <S.AgreeFormContainer>
            <S.AgreeItemContainer onClick={toggleAll}>
                <S.CheckImg src={allChecked ? CheckClick : Check} alt="check" />
                <S.ItemP>모두 동의합니다.</S.ItemP>
            </S.AgreeItemContainer>

            <S.AgreeBar />

            <ListAgree agreeList={agreeList} toggleItem={toggleItem} />
        </S.AgreeFormContainer>
    )
}

export default AgreeForm;