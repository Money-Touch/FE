import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import ItemGrid2 from './item-grid2';
import type { ListFeedProps } from '../../../../../types/auth/mypage/myfeed';

const ListGrid2 = ({ data }: ListFeedProps) => {
  return (
    <M.ListGrid2Container>
      {data?.map((item) => (
        <ItemGrid2 key={item.id} item={item} />
      ))}
    </M.ListGrid2Container>
  );
};

export default ListGrid2;
