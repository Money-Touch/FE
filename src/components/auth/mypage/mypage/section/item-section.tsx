import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ListMenu from '../menu/list-menu';
import type { MenuSection } from '../../../../../types/auth/mypage/mypage';

const ItemSection = ({ item }: { item: MenuSection }) => {
  return (
    <div className={M.ItemSectionContainer}>
      <p className={M.ItemSectionP}>{item.title}</p>
      <ListMenu list={item.list} />
    </div>
  );
};

export default ItemSection;
