import type { AgreeItem } from '../../../../types/auth/signup/agree';
import Check from '../../../../assets/images/auth/signup/check.png';
import CheckClick from '../../../../assets/images/auth/signup/checkClick.png';
import * as S from '../../../../styles/auth/signup/signup.style';
import colors from '../../../../styles/common/colors';

interface ItemAgreeProps {
  item: AgreeItem;
  toggleItem: (id: number) => void;
}

const ItemAgree = ({ item, toggleItem }: ItemAgreeProps) => {
  const { id, name, checked } = item;

  return (
    <S.AgreeItemContainer onClick={() => toggleItem(id)}>
      <S.CheckImg src={checked ? CheckClick : Check} alt="check" />
      <S.ItemP style={{ fontSize: '1.5rem', color: colors.G4 }}>{name}</S.ItemP>
    </S.AgreeItemContainer>
  );
};

export default ItemAgree;
