import ItemAgree from './item-agree';
import type { AgreeItem } from '../../../../types/auth/signup/agree';
import * as S from '../../../../styles/auth/signup/signup.style';

interface ListAgreeProps {
  agreeList: AgreeItem[];
  toggleItem: (id: number) => void;
}

const ListAgree = ({ agreeList, toggleItem }: ListAgreeProps) => {
  return (
    <div className={S.ListContainer}>
      {agreeList.map((item) => (
        <ItemAgree key={item.id} item={item} toggleItem={toggleItem} />
      ))}
    </div>
  );
};

export default ListAgree;
