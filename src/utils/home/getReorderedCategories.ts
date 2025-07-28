import { DEFAULT_CATEGORIES } from '../../constants/home/defaultSpending';
import { USER_CATEGORIES } from '../../mocks/home/mockCategoryData';

export function getReorderedCategories() {
  const ETC_INDEX = DEFAULT_CATEGORIES.indexOf('기타');
  if (ETC_INDEX === -1) return [...DEFAULT_CATEGORIES, ...USER_CATEGORIES];

  return [...DEFAULT_CATEGORIES.slice(0, ETC_INDEX + 1), ...USER_CATEGORIES];
}
