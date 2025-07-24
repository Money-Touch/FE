import type { ListGridProps } from '../../../../../types/auth/mypage/myfeed';
import GridData from '../../../../../mocks/auth/mypage/myfeed/gridData';
import ItemGrid from './item-grid';
import * as M from '../../../../../styles/auth/mypage/myfeed.style';

const ListGrid = ({ selectedId, setSelectedId }: ListGridProps) => {
  return (
    <div className={M.ListGridContainer}>
      {GridData.map((item) => (
        <ItemGrid
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onClick={setSelectedId}
        />
      ))}
    </div>
  );
};

export default ListGrid;
