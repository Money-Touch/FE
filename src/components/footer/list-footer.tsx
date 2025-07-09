import * as F from '../../styles/footer/footer.style';
import ItemFooter from './item-footer';
import FooterData from '../../mocks/footer/footerData';

const ListFooter = () => {
  return (
    <F.ListContainer>
      {FooterData.map((item, index) => (
        <ItemFooter key={index} item={item} />
      ))}
    </F.ListContainer>
  );
};

export default ListFooter;
