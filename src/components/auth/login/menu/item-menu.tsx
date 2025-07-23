import * as L from '../../../../styles/auth/login/login.style';
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
    <p className={L.ItemP(!!link)} onClick={handleClick}>
      {name}
    </p>
  );
};

export default ItemMenu;
