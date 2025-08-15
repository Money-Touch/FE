import * as S from '../../../styles/home/home.style';
import Logo from '../../../assets/images/home/logo.png';
import Alarm from '../../../assets/images/home/alarm.png';
import New from '../../../assets/images/home/alarm_new.png';

interface HeaderProps {
  hasUnread: boolean;
  onAlarmClick: () => void;
  bgColor?: string;
}

const Header = ({
  hasUnread,
  onAlarmClick,
  bgColor = 'bg-[var(--color-B2)]',
}: HeaderProps) => {
  return (
    <div className={`${S.Header} ${bgColor}`}>
      <img src={Logo} alt="logo" className={S.LogoImg} />
      <div className={S.AlarmWrapper}>
        <img
          src={Alarm}
          alt="alarm"
          onClick={onAlarmClick}
          className={S.AlarmImg}
        />
        {hasUnread && <img src={New} alt="new" className={S.New} />}
      </div>
    </div>
  );
};

export default Header;
