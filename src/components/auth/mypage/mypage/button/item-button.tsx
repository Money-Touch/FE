import * as M from '../../../../../styles/auth/mypage/mypage.style';
import { useNavigate } from 'react-router-dom';
import type { MenuButton } from '../../../../../types/auth/mypage/mypage';

const ItemButton = ({ item }: { item: MenuButton }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(item.link);
  };

  return (
    <M.ItemButtonContainer onClick={handleItemClick}>
      <M.ItemButtonInnerContainer>
        <M.ItemButtonImg src={item.image} alt={item.name} />
        <M.ItemButtonP>{item.name}</M.ItemButtonP>
      </M.ItemButtonInnerContainer>
    </M.ItemButtonContainer>
  );
};

export default ItemButton;
