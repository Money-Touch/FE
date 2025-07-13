import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import type { ItemGridProps } from '../../../../../types/auth/mypage/myfeed';

const ItemGrid = ({ item, isSelected, onClick }: ItemGridProps) => {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <M.ItemGridImg
      src={isSelected ? item.imageClick : item.image}
      alt={item.name}
      onClick={handleClick}
    />
  );
};

export default ItemGrid;
