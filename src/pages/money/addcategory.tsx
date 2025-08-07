import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/common/colors';
import leftArrow from '../../assets/images/header/leftArrow.png';

const MOBILE_MAX = '430px';
const MAX_LEN = 8;

const AddCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState('');

  const from = location.state?.from || '/budget-register';

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

const Wrap = styled.div`
  position: relative;
  max-width: ${MOBILE_MAX};
  margin: 0 auto;
  min-height: 100vh;
  background: ${colors.B1};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.G8};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;

  img,
  svg {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }
`;

const IconBtnLeft = styled(IconBase)`
  left: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const Body = styled.main`
  flex: 1;
  padding: 24px 24px 0;
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 12px;
  border: none;
  border-bottom: 2px solid ${colors.G6};
  background: transparent;

  &:focus {
    outline: none;
    border-color: ${colors.mainColor1};
  }
`;

const CharCount = styled.div`
  text-align: right;
  color: ${colors.G5};
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitBtn = styled.button<{ disabled: boolean }>`
  width: calc(100% - 32px);
  margin: 0 16px 160px;
  padding: 14px 0;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) =>
    disabled ? colors.G6 : colors.mainColor1};
`;
