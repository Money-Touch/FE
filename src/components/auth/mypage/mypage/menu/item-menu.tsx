import * as M from '../../../../../styles/auth/mypage/mypage.style';
import RightArrow from '../../../../../assets/images/auth/mypage/rightArrow.png';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';

const ItemMenu = ({ item }: { item: MenuItem }) => {
  return (
    <M.ItemMenuContainer>
      <M.ItemMenuP>{item.name}</M.ItemMenuP>
      <M.RightArrowImg src={RightArrow} alt="rightArrow" />
    </M.ItemMenuContainer>
  );
};

export default ItemMenu;
