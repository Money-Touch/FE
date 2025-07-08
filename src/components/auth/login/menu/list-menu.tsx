import * as L from '../../../../styles/auth/login/login.style';
import MenuData from '../../../../utils/auth/login/menuData';
import ItemMenu from './item-menu';

const ListMenu = () => {
  return (
    <L.ListMenuContainer>
      {MenuData.map((item) => (
        <ItemMenu key={item.id} item={item} />
      ))}
    </L.ListMenuContainer>
  );
};

export default ListMenu;
