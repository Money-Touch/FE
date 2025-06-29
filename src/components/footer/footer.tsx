import ListFooter from "./list-footer";
import * as F from "../../styles/footer/footer";

const Footer = () => {
    return (
        <div className="pageContainer" style={{ position: "relative" }}>
            <F.FooterContainer>
                <ListFooter />
            </F.FooterContainer>
        </div>
    )
}

export default Footer;