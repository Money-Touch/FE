import type { FooterItem } from '../../types/footer/footer';
import * as F from '../../styles/footer/footer.style';
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
    <div className={F.ItemContainer} onClick={handleItemClick}>
      <img className={F.ItemImage} src={imageSrc} alt={item.name} />
      <p className={`${F.ItemP} ${isActive ? 'active' : ''}`}>{item.name}</p>
    </div>
  );
};

export default ItemFooter;
