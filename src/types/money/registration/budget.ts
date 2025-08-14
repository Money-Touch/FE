export interface CategoryBudget {
  categoryName: string;
  amount: number;
  categoryType: 'DEFAULT' | 'CUSTOM' | 'ROUTINE_CATEGORY';
}

export interface BudgetPayload {
  totalBudget: number;
  defaultCategoryBudgets: CategoryBudget[];
  customCategoryBudgets?: CategoryBudget[];
  routineCategoryBudgets?: CategoryBudget[];
}
