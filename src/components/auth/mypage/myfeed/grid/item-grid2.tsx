import type { ItemFeedProps } from '../../../../../types/auth/mypage/myfeed';
import { useNavigate } from 'react-router-dom';
import * as M from '../../../../../styles/auth/mypage/myfeed.style';

const ItemGrid2 = ({ item }: ItemFeedProps) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/feed/post/${item.id}`);
  };

  return (
    <div className={M.ItemGrid2Contaienr} onClick={handleItemClick}>
      <p className={M.ItemGrid2P}>{item.name}</p>

      <div className={M.ItemGrid2Img} />

      <div className={M.ItemGrid2PDiv}>
        <p
          className={`${M.ItemGrid2P} !font-medium !text-[1.2rem] !text-[var(--color-G3)] leading-[1.6rem]`}
        >
          {item.name}
        </p>

        <p
          className={`${M.ItemGrid2P} !font-medium !text-[2rem] !text-[var(--color-G1)]`}
        >
          {item.email}
        </p>
      </div>
    </div>
  );
};

export default ItemGrid2;
