import type { CategoryBudget } from './budget';

export interface BudgetDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    totalBudget: number;
    defaultCategoryBudgets: CategoryBudget[];
    customCategoryBudgets: CategoryBudget[];
    routineCategoryBudgets: CategoryBudget[];
  };
}
