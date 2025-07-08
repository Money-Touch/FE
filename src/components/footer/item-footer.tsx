import type { FooterItem } from '../../types/footer/footer';
import * as F from '../../styles/footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';

interface ItemProps {
  item: FooterItem;
}

const ItemFooter = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname.startsWith(item.link);
  const imageSrc = isActive ? item.imageClick : item.image;

  const handleItemClick = () => {
    navigate(`${item.link}`);
  };

  return (
    <F.ItemContainer onClick={handleItemClick}>
      <F.ItemImage src={imageSrc} alt={item.name} />
      <F.ItemP className={isActive ? 'active' : ''}>{item.name}</F.ItemP>
    </F.ItemContainer>
  );
};

export default ItemFooter;
