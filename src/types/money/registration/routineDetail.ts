import type { CategoryRoutine } from './routine';

export interface RoutineDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    totalBudget: number;
    defaultCategoryBudgets: CategoryRoutine[];
    customCategoryBudgets: CategoryRoutine[];
    routineCategoryBudgets: CategoryRoutine[];
  };
}
