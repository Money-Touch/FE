import * as S from '../../../styles/auth/signup/signup.style';
import * as M from '../../../styles/auth/mypage/mypage.style';
import colors from '../../../styles/common/colors';
import Profile from '../../../components/auth/mypage/mypage/profile';
import ListButton from '../../../components/auth/mypage/mypage/button/list-button';
import ListSection from '../../../components/auth/mypage/mypage/section/list-section';

const Mypage = () => {
  return (
    <S.AgreeContainer
      style={{ padding: '0 0 3.2rem 0', background: colors.white }}
    >
      <Profile />

      <M.ProfileBar />

      <ListButton />

      <ListSection />
    </S.AgreeContainer>
  );
};

export default Mypage;
