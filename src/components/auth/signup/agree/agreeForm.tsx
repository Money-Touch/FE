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
    <div className={S.AgreeFormContainer}>
      <div className={S.AgreeItemContainer} onClick={toggleAll}>
        <img
          className={S.CheckImg}
          src={allChecked ? CheckClick : Check}
          alt="check"
        />
        <p className={S.ItemP}>모두 동의합니다.</p>
      </div>

      <div className={S.AgreeBar} />

      <ListAgree agreeList={agreeList} toggleItem={toggleItem} />
    </div>
  );
};

export default AgreeForm;
