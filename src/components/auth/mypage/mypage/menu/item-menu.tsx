import * as M from '../../../../../styles/auth/mypage/mypage.style';
import RightArrow from '../../../../../assets/images/auth/mypage/rightArrow.png';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';

const ItemMenu = ({ item }: { item: MenuItem }) => {
  return (
    <div className={M.ItemMenuContainer}>
      <p className={M.ItemMenuP}>{item.name}</p>
      <img className={M.RightArrowImg} src={RightArrow} alt="rightArrow" />
    </div>
  );
};

export default ItemMenu;
