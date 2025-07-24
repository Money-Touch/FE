import type { AgreeItem } from '../../../../types/auth/signup/agree';
import Check from '../../../../assets/images/auth/signup/check.png';
import CheckClick from '../../../../assets/images/auth/signup/checkClick.png';
import * as S from '../../../../styles/auth/signup/signup.style';

interface ItemAgreeProps {
  item: AgreeItem;
  toggleItem: (id: number) => void;
}

const ItemAgree = ({ item, toggleItem }: ItemAgreeProps) => {
  const { id, name, checked } = item;

  return (
    <div className={S.AgreeItemContainer} onClick={() => toggleItem(id)}>
      <img
        className={S.CheckImg}
        src={checked ? CheckClick : Check}
        alt="check"
      />
      <p className={`${S.ItemP} !text-[1.5rem] !text-[var(--color-G4)]`}>
        {name}
      </p>
    </div>
  );
};

export default ItemAgree;
