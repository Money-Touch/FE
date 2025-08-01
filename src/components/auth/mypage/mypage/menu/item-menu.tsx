import * as M from '../../../../../styles/auth/mypage/mypage.style';
import RightArrow from '../../../../../assets/images/auth/mypage/rightArrow.png';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';
import { useNavigate } from 'react-router-dom';

const ItemMenu = ({ item }: { item: MenuItem }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.name === '로그아웃') {
      localStorage.clear();
      alert('로그아웃이 완료되었습니다.');
      navigate('/login');
    }
  };

  return (
    <div className={M.ItemMenuContainer} onClick={handleClick}>
      <p className={M.ItemMenuP}>{item.name}</p>
      <img className={M.RightArrowImg} src={RightArrow} alt="rightArrow" />
    </div>
  );
};

export default ItemMenu;
