import type { ItemFeedProps } from '../../../../../types/auth/mypage/myfeed';
import { useNavigate } from 'react-router-dom';
import * as M from '../../../../../styles/auth/mypage/myfeed.style';

const ItemGrid4 = ({ item }: ItemFeedProps) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/feed/${item.id}`);
  };

  return <div className={M.ItemGrid4Div} onClick={handleItemClick} />;
};

export default ItemGrid4;
