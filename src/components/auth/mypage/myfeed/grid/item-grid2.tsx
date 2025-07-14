import type { ItemFeedProps } from '../../../../../types/auth/mypage/myfeed';
import { useNavigate } from 'react-router-dom';
import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import colors from '../../../../../styles/common/colors';

const ItemGrid2 = ({ item }: ItemFeedProps) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/feed/${item.id}`);
  };

  return (
    <M.ItemGrid2Contaienr onClick={handleItemClick}>
      <M.ItemGrid2P>{item.name}</M.ItemGrid2P>

      <M.ItemGrid2Img />

      <M.ItemGrid2PDiv>
        <M.ItemGrid2P fontSize="1.2rem" fontWeight={500}>
          {item.name}
        </M.ItemGrid2P>

        <M.ItemGrid2P fontSize="2rem" fontWeight={500} color={colors.G1}>
          {item.email}
        </M.ItemGrid2P>
      </M.ItemGrid2PDiv>
    </M.ItemGrid2Contaienr>
  );
};

export default ItemGrid2;
