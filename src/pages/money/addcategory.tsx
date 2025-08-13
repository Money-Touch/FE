import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import CircleCloseIcon from '../../assets/images/budget/CircleClose.png';
import {
  Wrap,
  Body,
  InputWrapper,
  Input,
  CircleClose,
  CharCount,
  SubmitBtnContainer,
  SubmitBtn,
} from '../../styles/budget/addcategory.styles';

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
    <Wrap>
      <Header title="카테고리 추가" />

      <Body>
        <InputWrapper>
          <Input
            placeholder="카테고리 이름"
            value={category}
            onChange={handleChange}
          />
          <CircleClose
            src={CircleCloseIcon}
            alt="delete"
            onClick={() => setCategory('')}
          />
          <CharCount>
            {category.length}
            <span>/{MAX_LEN}</span>
          </CharCount>
        </InputWrapper>
      </Body>

      <SubmitBtnContainer>
        <SubmitBtn disabled={!category.trim()} onClick={handleSubmit}>
          등록
        </SubmitBtn>
      </SubmitBtnContainer>
    </Wrap>
  );
};

export default AddCategory;
