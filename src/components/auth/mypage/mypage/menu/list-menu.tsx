import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ItemMenu from './item-menu';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';

const ListMenu = ({ list }: { list: MenuItem[] }) => {
  return (
    <div className={M.ListMenuContainer}>
      {list.map((item) => (
        <ItemMenu key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListMenu;
