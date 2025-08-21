export interface CategoryRoutine {
  categoryName: string;
  amount: number;
  categoryType: 'DEFAULT' | 'CUSTOM' | 'ROUTINE_CATEGORY';
}

export interface RoutinePayload {
  totalBudget: number;
  defaultCategoryBudgets: CategoryRoutine[];
  customCategoryBudgets?: CategoryRoutine[];
  routineCategoryBudgets?: CategoryRoutine[];
}
