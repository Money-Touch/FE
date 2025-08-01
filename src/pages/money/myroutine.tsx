import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/common/colors';
import leftArrow from '../../assets/images/header/leftArrow.png';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];
const MOBILE_MAX = '430px';

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const MyRoutine = () => {
  const navigate = useNavigate();
  const [routineTitle, setRoutineTitle] = useState('소비 루틴');
  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [customCats, setCustomCats] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('routineEntries');
    if (raw) {
      try {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          const last = list[list.length - 1];
          if (last.title) setRoutineTitle(last.title);
        }
      } catch (e) {
        console.error('routineEntries parse error:', e);
      }
    }

    try {
      setMonthBudget(Number(localStorage.getItem('monthBudget') || 0));

      const savedCat = JSON.parse(
        localStorage.getItem('categoryBudgets') || '[]',
      );
      if (savedCat.length === 5) setCatBudget(savedCat);

      const savedCurs = JSON.parse(
        localStorage.getItem('customCategories') || '[]',
      );
      setCustomCats(savedCurs);

      const savedCBudg = JSON.parse(
        localStorage.getItem('customCategoryBudgets') || '[]',
      );
      setCustomBudget(
        savedCBudg.length ? savedCBudg : Array(savedCurs.length).fill(0),
      );
    } catch (e) {
      console.error('budget-related data parse error:', e);
    }
  }, []);

  return (
    <Wrap>
      <Header>
        <IconBtnLeft onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <H1>{routineTitle}</H1>
      </Header>

      <Body>
        <Section>
          <Label>한 달 예산</Label>
          <Row>
            <Month>{comma(monthBudget)}원</Month>
          </Row>
        </Section>

        <Divider />

        <Section>
          <Row></Row>
          <CatUl>
            {DEFAULT_CATEGORIES.map((c, i) => (
              <CatLi key={c}>
                <span>{c}</span>
                <span>{comma(catBudget[i])}원</span>
              </CatLi>
            ))}
            {customCats.map((name, i) => (
              <CatLi key={name}>
                <span>{name}</span>
                <span>{comma(customBudget[i])}원</span>
              </CatLi>
            ))}
          </CatUl>
        </Section>
      </Body>
    </Wrap>
  );
};

export default MyRoutine;

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

const IconBtnLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const Body = styled.main`
  flex: 1;
  padding: 24px 16px 0;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Month = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.G1};
`;

const Divider = styled.hr`
  height: 8px;
  margin: -10px -16px 24px;
  border: none;
  background: ${colors.G8};
`;

const CatUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CatLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;
