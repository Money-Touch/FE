import * as M from '../../../../../styles/auth/mypage/myfeed.style';
import ItemGrid4 from './item-grid4';
import type { ListFeedProps } from '../../../../../types/auth/mypage/myfeed';

const ListGrid4 = ({ data }: ListFeedProps) => {
  return (
    <div className={M.ListGrid4Container}>
      {data?.map((item) => (
        <ItemGrid4 key={item.consumptionRecordId} item={item} />
      ))}
    </div>
  );
};

export default ListGrid4;
