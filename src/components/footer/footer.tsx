import styled from "styled-components";
import colors from "../../styles/common/colors";
import ListFooter from "./list-footer";

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    background: ${colors.white};
    width: 100%;
    height: 10rem;
    border-radius: 2rem 2rem 0 0;
    display: flex;
    justify-content: center;
    padding-top: 1.3rem;
`

const Footer = () => {
    return (
        <div className="pageContainer" style={{ position: "relative" }}>
            <FooterContainer>
                <ListFooter />
            </FooterContainer>
        </div>
    )
}

export default Footer;