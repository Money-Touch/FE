import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import leftArrow from '../../assets/images/header/leftArrow.png';
import {
  Wrap,
  Header,
  IconBtnLeft,
  Title,
  Body,
  InputWrapper,
  Input,
  CharCount,
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
      <Header>
        <IconBtnLeft onClick={() => navigate(from)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <Title>카테고리 추가</Title>
      </Header>

      <Body>
        <InputWrapper>
          <Input
            placeholder="카테고리 이름"
            value={category}
            onChange={handleChange}
          />
          <CharCount>
            {category.length}/{MAX_LEN}
          </CharCount>
        </InputWrapper>
      </Body>

      <SubmitBtn disabled={!category.trim()} onClick={handleSubmit}>
        등록
      </SubmitBtn>
    </Wrap>
  );
};

export default AddCategory;
