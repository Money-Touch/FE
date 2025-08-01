import type { ItemFeedProps } from '../../../../../types/auth/mypage/myfeed';
import { useNavigate } from 'react-router-dom';
import * as M from '../../../../../styles/auth/mypage/myfeed.style';

const ItemGrid4 = ({ item }: ItemFeedProps) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/feed/post/${item.consumptionRecordId}`);
  };

  return (
    <img
      className={M.ItemGrid4Div}
      src={item.imageUrls[0]}
      alt="image"
      onClick={handleItemClick}
    />
  );
};

export default ItemGrid4;
