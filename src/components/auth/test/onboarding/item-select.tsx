import * as T from '../../../../styles/auth/test/test.style';

interface ItemSelectProps {
  id: number;
  value: string;
  selected: boolean;
  onSelect: (id: number, value: string) => void;
}

const ItemSelect = ({ id, value, selected, onSelect }: ItemSelectProps) => {
  return (
    <T.ItemSelectContainer
      selected={selected}
      onClick={() => onSelect(id, value)}
    >
      {value}
    </T.ItemSelectContainer>
  );
};

export default ItemSelect;
