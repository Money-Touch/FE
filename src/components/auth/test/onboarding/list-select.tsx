import * as T from '../../../../styles/auth/test/test';
import ItemSelect from './item-select';

interface ListSelectProps {
  id: number;
  selectList: string[];
  checked: string | null;
  onSelect: (id: number, value: string) => void;
}

const ListSelect = ({ id, selectList, checked, onSelect }: ListSelectProps) => {
  const firstRow = selectList.slice(0, 3);
  const secondRow = selectList.slice(3);

  return (
    <>
      <T.ListSelectContainer>
        {firstRow.map((option) => (
          <ItemSelect
            key={option}
            id={id}
            value={option}
            selected={checked === option}
            onSelect={onSelect}
          />
        ))}
      </T.ListSelectContainer>

      {secondRow.length > 0 && (
        <T.ListSelectContainer>
          {secondRow.map((option) => (
            <ItemSelect
              key={option}
              id={id}
              value={option}
              selected={checked === option}
              onSelect={onSelect}
            />
          ))}
        </T.ListSelectContainer>
      )}
    </>
  );
};

export default ListSelect;
