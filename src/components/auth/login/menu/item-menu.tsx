import * as L from '../../../../styles/auth/login/login';
import type { MenuItem } from '../../../../types/auth/login/menu';
import { useNavigate } from 'react-router-dom';

interface ItemMenuProps {
  item: MenuItem;
}

const ItemMenu = ({ item }: ItemMenuProps) => {
  const { name, link } = item;
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <L.ItemP onClick={handleClick} clickable={!!link}>
      {name}
    </L.ItemP>
  );
};

export default ItemMenu;
