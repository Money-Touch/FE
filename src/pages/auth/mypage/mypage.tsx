import * as S from '../../../styles/auth/signup/signup.style';
import * as M from '../../../styles/auth/mypage/mypage.style';
import Profile from '../../../components/auth/mypage/mypage/profile';
import ListButton from '../../../components/auth/mypage/mypage/button/list-button';
import ListSection from '../../../components/auth/mypage/mypage/section/list-section';
import { useMypageQuery } from '../../../hooks/auth/mypage/useMypageQuery';

const Mypage = () => {
  const { data } = useMypageQuery();
  // console.log(data);

  return (
    <div
      className={`${S.AgreeContainer} !pb-[11.6rem] !bg-[var(--color-B2)] !px-0`}
    >
      <Profile data={data} />

      <div className={M.ProfileBar} />

      <ListButton />

      <ListSection />
    </div>
  );
};

export default Mypage;
