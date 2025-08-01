import * as M from '../../../../../styles/auth/mypage/mypage.style';
import ButtonData from '../../../../../mocks/auth/mypage/mypage/buttonData';
import ItemButton from './item-button';

const ListButton = () => {
  return (
    <div className={M.ListButtonContainer}>
      {ButtonData.map((item) => (
        <ItemButton key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListButton;
