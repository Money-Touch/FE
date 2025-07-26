import * as S from '../../../styles/home/record.style';

interface Props {
  selectedCategory: string;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelector = ({
  selectedCategory,
  categories,
  onSelectCategory,
}: Props) => {
  return (
    <div className={S.CategoryButtonWrapper}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={S.CategoryButton(selectedCategory === category)}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
