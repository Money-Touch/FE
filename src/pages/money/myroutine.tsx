import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import {
  Wrap,
  Body,
  Section,
  Label,
  Row,
  Month,
  Divider,
  CatUl,
  CatLi,
} from '../../styles/budget/myroutine.styles';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const MyRoutine = () => {
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
      <Header title={routineTitle} />

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
                <span className="wonP">{comma(catBudget[i])}원</span>
              </CatLi>
            ))}
            {customCats.map((name, i) => (
              <CatLi key={name}>
                <span>{name}</span>
                <span className="wonP">{comma(customBudget[i])}원</span>
              </CatLi>
            ))}
          </CatUl>
        </Section>
      </Body>
    </Wrap>
  );
};

export default MyRoutine;
