import * as H from '../../styles/header/header.style';
import LeftArrow from '../../assets/images/header/leftArrow.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onBack?: () => void;
  title?: string;
}

const Header = ({ onBack, title }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className={H.HeaderContainer}>
      <img
        className={H.LeftArrowImg}
        src={LeftArrow}
        alt="leftArrow"
        onClick={handleClick}
      />
      <p className={H.Title}>{title}</p>
    </div>
  );
};

export default Header;
