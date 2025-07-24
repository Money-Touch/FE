import * as L from '../../../../styles/auth/login/login.style';
import MenuData from '../../../../mocks/auth/login/menuData';
import ItemMenu from './item-menu';

const ListMenu = () => {
  return (
    <div className={L.ListMenuContainer}>
      {MenuData.map((item) => (
        <ItemMenu key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListMenu;
