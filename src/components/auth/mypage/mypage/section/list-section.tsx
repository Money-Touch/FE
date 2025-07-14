import * as M from '../../../../../styles/auth/mypage/mypage.style';
import SectionData from '../../../../../mocks/auth/mypage/mypage/sectionData';
import ItemSection from './item-section';

const ListSection = () => {
  return (
    <M.ListSectionContainer>
      {SectionData.map((item) => (
        <ItemSection key={item.id} item={item} />
      ))}
    </M.ListSectionContainer>
  );
};

export default ListSection;
