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
    <S.CategoryButtonWrapper>
      {categories.map((category) => (
        <S.CategoryButton
          key={category}
          $selected={selectedCategory === category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </S.CategoryButton>
      ))}
    </S.CategoryButtonWrapper>
  );
};

export default CategorySelector;
