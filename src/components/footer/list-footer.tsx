import styled from "styled-components";
import ItemFooter from "./item-footer";
import FooterData from "../../utils/footer/footerData";

const ListContainer = styled.div`
    display: flex;
    gap: 5.8rem;
`

const ListFooter = () => {
    return (
        <ListContainer>
            {FooterData.map((item, index) => (
                <ItemFooter
                    key={index}
                    item={item}
                />
            ))}
        </ListContainer>
    )
}

export default ListFooter;