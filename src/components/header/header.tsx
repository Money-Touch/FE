import * as H from "../../styles/header/header";
import LeftArrow from "../../assets/images/header/leftArrow.png";
import { useNavigate } from "react-router-dom";
import type { HeaderProps } from "../../types/header/header";

const Header = ({ to }: HeaderProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    }

    return (
        <H.HeaderContainer>
            <H.LeftArrowImg src={LeftArrow} alt="leftArrow" onClick={handleClick} />
        </H.HeaderContainer>
    )
}

export default Header;