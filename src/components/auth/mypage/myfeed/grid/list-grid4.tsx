import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import ItemGrid4 from './item-grid4';
import type { ListFeedProps } from '../../../../../types/auth/mypage/myfeed';

const ListGrid4 = ({ data }: ListFeedProps) => {
  return (
    <M.ListGrid4Container>
      {data?.map((item) => (
        <ItemGrid4 key={item.id} item={item} />
      ))}
    </M.ListGrid4Container>
  );
};

export default ListGrid4;
