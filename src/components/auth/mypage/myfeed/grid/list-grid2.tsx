import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import ItemGrid2 from './item-grid2';
import type { ListFeedProps } from '../../../../../types/auth/mypage/myfeed';

const ListGrid2 = ({ data }: ListFeedProps) => {
  return (
    <div className={M.ListGrid2Container}>
      {data?.map((item) => (
        <ItemGrid2 key={item.consumptionRecordId} item={item} />
      ))}
    </div>
  );
};

export default ListGrid2;
