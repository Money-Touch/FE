import * as H from "../../styles/header/header";
import LeftArrow from "../../assets/images/header/leftArrow.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <H.HeaderContainer>
            <H.LeftArrowImg src={LeftArrow} alt="leftArrow" onClick={handleClick} />
        </H.HeaderContainer>
    )
}

export default Header;