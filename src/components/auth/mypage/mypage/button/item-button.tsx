import * as M from '../../../../../styles/auth/mypage/mypage.style';
import { useNavigate } from 'react-router-dom';
import type { MenuButton } from '../../../../../types/auth/mypage/mypage';

const ItemButton = ({ item }: { item: MenuButton }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(item.link);
  };

  return (
    <div className={M.ItemButtonContainer} onClick={handleItemClick}>
      <div className={M.ItemButtonInnerContainer}>
        <img className={M.ItemButtonImg} src={item.image} alt={item.name} />
        <p className={M.ItemButtonP}>{item.name}</p>
      </div>
    </div>
  );
};

export default ItemButton;
