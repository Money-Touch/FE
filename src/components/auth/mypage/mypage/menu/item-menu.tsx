import * as M from '../../../../../styles/auth/mypage/mypage.style';
import RightArrow from '../../../../../assets/images/auth/mypage/rightArrow.png';
import type { MenuItem } from '../../../../../types/auth/mypage/mypage';
import { useNavigate } from 'react-router-dom';
import { useDeleteMutation } from '../../../../../hooks/auth/mypage/useDeleteMutation';

const ItemMenu = ({ item, userId }: { item: MenuItem; userId: number }) => {
  const navigate = useNavigate();
  // console.log('userId', userId);

  const handleClick = async () => {
    if (item.name === '로그아웃') {
      localStorage.clear();
      alert('로그아웃이 완료되었습니다.');
      navigate('/login');
    } else if (item.name === '회원 탈퇴') {
      const confirmed = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
      if (!confirmed) return;

      try {
        const res = await useDeleteMutation({ userId });

        if (res.isSuccess) {
          localStorage.clear();
          alert('회원탈퇴가 완료되었습니다.');
          navigate('/');
        } else {
          alert(res.message || '회원탈퇴에 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
        alert('회원탈퇴 중 오류가 발생했습니다.');
      }
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
