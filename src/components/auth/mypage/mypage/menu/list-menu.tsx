import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ItemMenu from './item-menu';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';

const ListMenu = ({ list }: { list: MenuItem[] }) => {
  return (
    <M.ListMenuContainer>
      {list.map((item) => (
        <ItemMenu key={item.id} item={item} />
      ))}
    </M.ListMenuContainer>
  );
};

export default ListMenu;
