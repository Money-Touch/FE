import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ButtonData from '../../../../../mocks/auth/mypage/buttonData';
import ItemButton from './item-button';

const ListButton = () => {
  return (
    <M.ListButtonContainer>
      {ButtonData.map((item) => (
        <ItemButton key={item.id} item={item} />
      ))}
    </M.ListButtonContainer>
  );
};

export default ListButton;
