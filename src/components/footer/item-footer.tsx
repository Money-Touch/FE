import type { FooterItem } from "../../types/footer/footer";
import styled from "styled-components";
import colors from "../../styles/common/colors";
import { useLocation, useNavigate } from "react-router-dom";

interface ItemProps {
    item: FooterItem;
}

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: center;
    cursor: pointer;
`

const ItemImage = styled.img`
    width: auto;
    height: 2.8rem;
`

const ItemP = styled.p`
    font-weight: 500;
    font-size: 1.2rem;
    color: ${colors.G5};

    &:hover {
        color: ${colors.G1};
    }
`

const ItemFooter = ({ item }: ItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname.startsWith(item.link);
    const imageSrc = isActive ? item.imageClick : item.image;

    const handleItemClick = () => {
        navigate(`${item.link}`);
    }

    return (
        <ItemContainer onClick={handleItemClick}>
            <ItemImage src={imageSrc} alt={item.name} />
            <ItemP>{item.name}</ItemP>
        </ItemContainer>
    )
}

export default ItemFooter;