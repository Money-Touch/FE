import * as T from '../../../../styles/auth/test/test.style';

interface ItemSelectProps {
  id: number;
  value: string;
  selected: boolean;
  onSelect: (id: number, value: string) => void;
}

const ItemSelect = ({ id, value, selected, onSelect }: ItemSelectProps) => {
  return (
    <li
      className={T.ItemSelectContainer(selected)}
      onClick={() => onSelect(id, value)}
    >
      {value}
    </li>
  );
};

export default ItemSelect;
