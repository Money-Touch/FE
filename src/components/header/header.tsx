import * as H from '../../styles/header/header.style';
import LeftArrow from '../../assets/images/header/leftArrow.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onBack?: () => void;
}

const Header = ({ onBack }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <H.HeaderContainer>
      <H.LeftArrowImg src={LeftArrow} alt="leftArrow" onClick={handleClick} />
    </H.HeaderContainer>
  );
};

export default Header;
