import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useClearBudgetStorage() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== '/budget-register' &&
      location.pathname !== '/add-category'
    ) {
      localStorage.removeItem('monthBudget');
      localStorage.removeItem('categoryBudgets');
      localStorage.removeItem('customCategories');
      localStorage.removeItem('customCategoryBudgets');
      localStorage.removeItem('routineCategories');
      localStorage.removeItem('routineCategoryBudgets');
      localStorage.removeItem('totalRoutineBudget');
      localStorage.removeItem('year');
      localStorage.removeItem('month');
      localStorage.removeItem('budgetId');
      localStorage.removeItem('routineId');
      localStorage.removeItem('budgetInitialized');
    }
  }, [location.pathname]);
}
