import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useClearBudgetStorage() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/budget-register' ||
      location.pathname === '/add-category' ||
      location.pathname === '/money-routine' ||
      location.pathname === '/routine-registration'
    ) {
      return () => {
        [
          'monthBudget',
          'categoryBudgets',
          'customCategories',
          'customCategoryBudgets',
          'routineCategories',
          'routineCategoryBudgets',
          'totalRoutineBudget',
          'year',
          'month',
          'budgetId',
          'routineId',
          'budgetInitialized',
        ].forEach((key) => localStorage.removeItem(key));
      };
    }
  }, [location.pathname]);
}
