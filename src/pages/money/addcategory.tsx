import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import CircleCloseIcon from '../../assets/images/budget/CircleClose.png';
import * as A from '../../styles/budget/addcategory.styles';

const MAX_LEN = 8;

const AddCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('');

  const from =
    (location.state as { from?: string } | null)?.from || '/budget-register';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LEN) setCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (!category.trim()) return;

    const existing = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    localStorage.setItem(
      'customCategories',
      JSON.stringify([...existing, category.trim()]),
    );
    navigate(from, { replace: true });
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
