import * as S from '../../../styles/home/record.style';
import checked from '../../../assets/images/home/record/checkTrue.png';
import unchecked from '../../../assets/images/home/record/check.png';

interface Props {
  isChecked: boolean;
  onToggle: () => void;
}

const CategoryCheck = ({ isChecked, onToggle }: Props) => {
  return (
    <S.CategoryCheckboxWrapper>
      <S.CheckboxIcon
        src={isChecked ? checked : unchecked}
        alt="checkbox"
        onClick={onToggle}
      />
      <label htmlFor="categoryOnly">가계부에만 등록하기</label>
    </S.CategoryCheckboxWrapper>
  );
};

export default CategoryCheck;
