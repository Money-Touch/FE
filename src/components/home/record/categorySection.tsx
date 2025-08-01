import * as S from '../../../styles/home/record.style';
import Title from './title';
import CategorySelector from './categorySelector';
import checked from '../../../assets/images/home/record/checkTrue.png';
import unchecked from '../../../assets/images/home/record/check.png';

interface Props {
  selectedCategory: string;
  categories: string[];
  isChecked: boolean;
  onSelectCategory: (category: string) => void;
  onToggle: () => void;
}

const CategorySection = ({
  selectedCategory,
  categories,
  isChecked,
  onSelectCategory,
  onToggle,
}: Props) => {
  return (
    <div className={S.CategorySection}>
      <Title>카테고리 선택</Title>
      <CategorySelector
        selectedCategory={selectedCategory}
        categories={categories}
        onSelectCategory={onSelectCategory}
      />
      <div
        className={S.CategoryCheckboxWrapper}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onToggle();
        }}
      >
        <img
          src={isChecked ? checked : unchecked}
          alt="checkbox"
          className={S.CheckboxIcon}
        />
        <label htmlFor="categoryOnly" className={S.CheckboxLabel}>
          가계부에만 등록하기
        </label>
      </div>
    </div>
  );
};

export default CategorySection;
