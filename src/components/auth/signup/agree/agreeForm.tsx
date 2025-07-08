import * as S from '../../../../styles/auth/signup/signup.style';
import Check from '../../../../assets/images/auth/signup/check.png';
import CheckClick from '../../../../assets/images/auth/signup/checkClick.png';
import ListAgree from './list-agree';
import { useAgreeForm } from '../../../../hooks/auth/signup/useAgreeForm';
import type { AgreeItem } from '../../../../types/auth/signup/agree';

interface AgreeFormProps {
  agreeList: AgreeItem[];
  setAgreeList: React.Dispatch<React.SetStateAction<AgreeItem[]>>;
}

const AgreeForm = ({ agreeList, setAgreeList }: AgreeFormProps) => {
  const { allChecked, toggleAll, toggleItem } = useAgreeForm(
    agreeList,
    setAgreeList,
  );

  return (
    <S.AgreeFormContainer>
      <S.AgreeItemContainer onClick={toggleAll}>
        <S.CheckImg src={allChecked ? CheckClick : Check} alt="check" />
        <S.ItemP>모두 동의합니다.</S.ItemP>
      </S.AgreeItemContainer>

      <S.AgreeBar />

      <ListAgree agreeList={agreeList} toggleItem={toggleItem} />
    </S.AgreeFormContainer>
  );
};

export default AgreeForm;
