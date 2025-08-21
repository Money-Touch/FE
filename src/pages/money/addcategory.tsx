import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import CircleCloseIcon from '../../assets/images/budget/CircleClose.png';
import * as A from '../../styles/budget/addcategory.styles';

const MAX_LEN = 8;

type FromState = { state?: { from?: string; budgetId?: number } };

const AddCategory = () => {
  const navigate = useNavigate();
  const location = useLocation() as FromState;

  useEffect(() => {
    localStorage.setItem('budgetInitialized', 'true');
  }, []);

  const from = location?.state?.from || '/budget-register';
  const budgetId = location?.state?.budgetId ?? 0;

  const [category, setCategory] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LEN) setCategory(e.target.value);
  };

  const handleSubmit = () => {
    const name = category.trim();
    if (!name) return;

    const existingCats: string[] = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    const existingBudgets: number[] = JSON.parse(
      localStorage.getItem('customCategoryBudgets') || '[]',
    );

    if (!existingCats.includes(name)) {
      const newCats = [...existingCats, name];
      const newBudgets = [...existingBudgets, 0];

      localStorage.setItem('customCategories', JSON.stringify(newCats));
      localStorage.setItem('customCategoryBudgets', JSON.stringify(newBudgets));

      const defaultBudgets: number[] = JSON.parse(
        localStorage.getItem('categoryBudgets') || '[]',
      );
      localStorage.setItem(
        'totalRoutineBudget',
        JSON.stringify([...defaultBudgets, ...newBudgets]),
      );
    }

    navigate(from, {
      replace: true,
      state: { budgetId, refresh: Date.now() },
    });
  };

  return (
    <div className={A.Wrap}>
      <Header title="카테고리 추가" />

      <main className={A.Body}>
        <div className={A.InputWrapper}>
          <input
            className={A.Input}
            placeholder="카테고리 이름"
            value={category}
            onChange={handleChange}
          />
          <img
            className={A.CircleClose}
            src={CircleCloseIcon}
            alt="delete"
            onClick={() => setCategory('')}
          />
          <p className={A.CharCount}>
            {category.length}
            <span>/{MAX_LEN}</span>
          </p>
        </div>
      </main>

      <div className={A.SubmitBtnContainer}>
        <button
          className={A.SubmitBtn(!category.trim())}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
