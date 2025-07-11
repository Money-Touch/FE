import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ListMenu from '../menu/list-menu';
import type { MenuSection } from '../../../../../types/auth/mypage/mypage';

const ItemSection = ({ item }: { item: MenuSection }) => {
  return (
    <M.ItemSectionContainer>
      <M.ItemSectionP>{item.title}</M.ItemSectionP>
      <ListMenu list={item.list} />
    </M.ItemSectionContainer>
  );
};

export default ItemSection;
