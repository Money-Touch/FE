import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import * as A from '../../styles/budget/myroutine.styles';
import { useMyRoutineDetailQuery } from '../../hooks/money/routine/useMyRoutineDetailQuery';

const DEFAULT_CATEGORIES = [
  '배달/외식',
  '패션/쇼핑',
  '교통',
  '카페',
  '기타',
] as const;
type DefaultCategory = (typeof DEFAULT_CATEGORIES)[number];
type CatBudget = { categoryName: string; amount: number };

const isDefaultCategory = (name: string): name is DefaultCategory =>
  (DEFAULT_CATEGORIES as readonly string[]).includes(name);

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const MyRoutine = () => {
  const { id } = useParams<{ id: string }>();
  const routineId = Number(id);
  const { data, isLoading, isError } = useMyRoutineDetailQuery(routineId);

  const routineName = data?.result?.routineName ?? '소비 루틴';
  const totalBudget = data?.result?.totalBudget ?? 0;

  const { defaultArr, customNames, customAmounts } = useMemo(() => {
    const list: CatBudget[] = data?.result?.categoryBudgetList ?? [];

    const map = new Map<string, number>(
      list.map((c) => [c.categoryName, c.amount] as const),
    );

    const defaultArr = DEFAULT_CATEGORIES.map((n) => map.get(n) ?? 0);
    const custom = list.filter((c) => !isDefaultCategory(c.categoryName));

    return {
      defaultArr,
      customNames: custom.map((c) => c.categoryName),
      customAmounts: custom.map((c) => c.amount),
    };
  }, [data?.result?.categoryBudgetList]);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className={A.Wrap}>
      <Header title={routineName} />
      <main className={A.Body}>
        <section className={A.Section}>
          <p className={A.Label}>한 달 예산</p>
          <div className={A.Row}>
            <p className={A.Month}>{comma(totalBudget)}원</p>
          </div>
        </section>

        <div className={A.Divider} />

        <section className={A.Section}>
          <div className={A.Row} />
          <ul className={A.CatUl}>
            {DEFAULT_CATEGORIES.map((c, i) => (
              <li className={A.CatLi} key={c}>
                <span>{c}</span>
                <span className={A.WonP}>{comma(defaultArr[i])}원</span>
              </li>
            ))}
            {customNames.map((name, i) => (
              <li className={A.CatLi} key={`${name}-${i}`}>
                <span>{name}</span>
                <span className={A.WonP}>{comma(customAmounts[i])}원</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MyRoutine;
