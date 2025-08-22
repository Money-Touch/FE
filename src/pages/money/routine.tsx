import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import closeIcon from '../../assets/images/budget/Close.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';
import type { CategoryRoutine } from '../../types/money/registration/routine';
import * as A from '../../styles/budget/routine.styles';

import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

type LocState = { state?: { budgetId?: number; refresh?: number } };

const Routine = () => {
  const navigate = useNavigate();

  const location = useLocation() as LocState;
  const budgetId = location?.state?.budgetId ?? 0;

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [customCats, setCustomCats] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<number[]>([]);
  const [routineCats, setRoutineCats] = useState<string[]>([]);
  const [routineBudget, setRoutineBudget] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [targetIdx, setTargetIdx] = useState<-1 | number>(-1);
  const [targetType, setTargetType] = useState<
    CategoryRoutine['categoryType'] | 'MONTH'
  >('MONTH');

  const { data: budgetDetailData } = useBudgetDetailQuery(budgetId || 0);
  // console.log('routine', budgetDetailData);

  const handleBack = () => {
    [
      'year',
      'month',
      'monthBudget',
      'categoryBudgets',
      'customCategories',
      'customCategoryBudgets',
      'totalRoutineBudget',
      'budgetId',
      'routineId',
      'budgetInitialized',
      'routineCategories',
      'routineCategoryBudgets',
    ].forEach((key) => localStorage.removeItem(key));

    navigate('/money', { state: { activeTab: 'routine' } });
  };

  useEffect(() => {
    if (localStorage.getItem('budgetInitialized') === 'true') return;

    const result = budgetDetailData?.result;
    if (!result) return;

    const total = Number(result.totalBudget ?? 0);
    setMonthBudget(total);

    const defaultList: Array<{ categoryName: string; amount: number }> =
      result.defaultCategoryBudgets ?? [];
    const defaultMap = new Map(
      defaultList.map((c) => [c.categoryName, Number(c.amount || 0)]),
    );
    const nextCatBudget = DEFAULT_CATEGORIES.map(
      (name) => defaultMap.get(name) ?? 0,
    );
    setCatBudget(nextCatBudget);

    const serverCustom: Array<{ categoryName: string; amount: number }> =
      result.customCategoryBudgets ?? [];
    const serverCats = serverCustom.map((c) => c.categoryName);
    const serverBudgets = serverCustom.map((c) => Number(c.amount || 0));

    const storedCats: string[] = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    const storedBudgets: number[] = JSON.parse(
      localStorage.getItem('customCategoryBudgets') || '[]',
    );

    const mergedCats = [...serverCats];
    const mergedBudgets = [...serverBudgets];

    storedCats.forEach((name, idx) => {
      if (!mergedCats.includes(name)) {
        mergedCats.push(name);
        mergedBudgets.push(Number(storedBudgets[idx] ?? 0));
      }
    });

    setCustomCats(mergedCats);
    setCustomBudget(mergedBudgets);

    const serverRoutine: Array<{ categoryName: string; amount: number }> =
      result.routineCategoryBudgets ?? [];
    const routineNames = serverRoutine.map((c) => c.categoryName);
    const routineBudgets = serverRoutine.map((c) => Number(c.amount || 0));

    setRoutineCats(routineNames);
    setRoutineBudget(routineBudgets);

    localStorage.setItem('monthBudget', String(total));
    localStorage.setItem('categoryBudgets', JSON.stringify(nextCatBudget));
    localStorage.setItem('customCategories', JSON.stringify(mergedCats));
    localStorage.setItem(
      'customCategoryBudgets',
      JSON.stringify(mergedBudgets),
    );
    localStorage.setItem('routineCategories', JSON.stringify(routineNames));
    localStorage.setItem(
      'routineCategoryBudgets',
      JSON.stringify(routineBudgets),
    );
    localStorage.setItem(
      'totalRoutineBudget',
      JSON.stringify([...nextCatBudget, ...mergedBudgets, ...routineBudgets]),
    );

    localStorage.setItem('budgetInitialized', 'true');
  }, [budgetDetailData]);

  useEffect(() => {
    const month = Number(localStorage.getItem('monthBudget') ?? 0);
    setMonthBudget(month);

    const catB: number[] = JSON.parse(
      localStorage.getItem('categoryBudgets') || '[]',
    );
    if (catB.length) setCatBudget(catB);

    const cats: string[] = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    const budgets: number[] = JSON.parse(
      localStorage.getItem('customCategoryBudgets') || '[]',
    );
    if (cats.length) {
      setCustomCats(cats);
      setCustomBudget(cats.map((_, i) => Number(budgets[i] ?? 0)));
    }

    const routineCats: string[] = JSON.parse(
      localStorage.getItem('routineCategories') || '[]',
    );
    const routineBudgets: number[] = JSON.parse(
      localStorage.getItem('routineCategoryBudgets') || '[]',
    );
    if (routineCats.length) {
      setRoutineCats(routineCats);
      setRoutineBudget(routineBudgets);
    }
  }, [location?.state?.refresh]);

  const comma = (v: string | number) =>
    String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const pressKey = (k: string) =>
    setRaw((prev) =>
      k === 'back' ? prev.slice(0, -1) : (prev + k).replace(/^0+(?=\d)/, ''),
    );

  const openModal = (
    idx: number,
    type: CategoryRoutine['categoryType'] | 'MONTH',
  ) => {
    setTargetIdx(idx);
    setTargetType(type);

    if (type === 'MONTH') {
      setRaw(String(monthBudget));
    } else if (type === 'DEFAULT') {
      setRaw(String(catBudget[idx] ?? 0));
    } else if (type === 'CUSTOM') {
      setRaw(String(customBudget[idx] ?? 0));
    } else if (type === 'ROUTINE_CATEGORY') {
      setRaw(String(routineBudget[idx] ?? 0));
    }

    setModalOpen(true);
  };

  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;

    switch (targetType) {
      case 'MONTH': {
        setMonthBudget(n);
        localStorage.setItem('monthBudget', String(n));
        break;
      }
      case 'DEFAULT': {
        setCatBudget((prev) => {
          const next = [...prev];
          next[targetIdx] = n;
          localStorage.setItem('categoryBudgets', JSON.stringify(next));
          localStorage.setItem(
            'totalRoutineBudget',
            JSON.stringify([...next, ...customBudget, ...routineBudget]),
          );
          return next;
        });
        break;
      }
      case 'CUSTOM': {
        setCustomBudget((prev) => {
          const next = [...prev];
          next[targetIdx] = n;
          localStorage.setItem('customCategoryBudgets', JSON.stringify(next));
          localStorage.setItem(
            'totalRoutineBudget',
            JSON.stringify([...catBudget, ...next, ...routineBudget]),
          );
          return next;
        });
        break;
      }
      case 'ROUTINE_CATEGORY': {
        setRoutineBudget((prev) => {
          const next = [...prev];
          next[targetIdx] = n;
          localStorage.setItem('routineCategoryBudgets', JSON.stringify(next));
          localStorage.setItem(
            'totalRoutineBudget',
            JSON.stringify([...catBudget, ...customBudget, ...next]),
          );
          return next;
        });
        break;
      }
    }

    setModalOpen(false);
    setRaw('');
  };

  const canConfirm =
    monthBudget > 0 &&
    monthBudget ===
      [...catBudget, ...customBudget, ...routineBudget].reduce(
        (acc, cur) => acc + cur,
        0,
      );

  const handleConfirm = () => {
    if (!canConfirm) return;

    localStorage.setItem('monthBudget', String(monthBudget));
    localStorage.setItem('categoryBudgets', JSON.stringify(catBudget));
    localStorage.setItem('customCategories', JSON.stringify(customCats));
    localStorage.setItem('customCategoryBudgets', JSON.stringify(customBudget));
    localStorage.setItem(
      'totalRoutineBudget',
      JSON.stringify([...catBudget, ...customBudget]),
    );

    navigate('/routine-registration', {
      replace: true,
      state: { budgetId },
    });
  };

  return (
    <div className={A.Wrap}>
      <Header title="소비 루틴 등록" onBack={handleBack} />

      <main className={A.Body}>
        <section className={A.Section}>
          <p className={A.Label}>한 달 예산</p>
          <div className={A.Row}>
            <p className={A.Month}>{comma(monthBudget)}원</p>
            <button
              className={A.IconBtn}
              onClick={() => openModal(-1, 'MONTH')}
            >
              <img className="w-full h-full" src={pencilIcon} alt="edit" />
            </button>
          </div>
        </section>

        <div className={A.Divider} />

        <section className={A.Section}>
          <div className={A.Row}>
            <p className={A.Label}>나의 소비 루틴</p>
            <button
              className={A.IconBtn}
              onClick={() => setEditMode((v) => !v)}
              aria-pressed={editMode}
            >
              <img className="w-full h-full" src={pencilIcon} alt="edit" />
            </button>
          </div>

          <ul className={A.CatUl}>
            {DEFAULT_CATEGORIES.map((c, i) => (
              <li
                key={c}
                className={A.CatLi(editMode)}
                onClick={() => editMode && openModal(i, 'DEFAULT')}
              >
                <span className={A.CatPrimary}>{c}</span>
                {editMode ? (
                  <div className={A.EditWrapper}>
                    <span className={A.EditInput}>{comma(catBudget[i])}원</span>
                  </div>
                ) : (
                  <span>{comma(catBudget[i])}원</span>
                )}
              </li>
            ))}

            {customCats.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className={A.CatLi(editMode)}
                onClick={() => editMode && openModal(i, 'CUSTOM')}
              >
                <span className={A.CatPrimary}>{name}</span>
                {editMode ? (
                  <div className={A.EditWrapper}>
                    <span className={A.EditInput}>
                      {comma(customBudget[i] ?? 0)}원
                    </span>
                  </div>
                ) : (
                  <span>{comma(customBudget[i] ?? 0)}원</span>
                )}
              </li>
            ))}

            {routineCats.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className={A.CatLi(editMode)}
                onClick={() => editMode && openModal(i, 'ROUTINE_CATEGORY')}
              >
                <span className={A.CatPrimary}>{name}</span>
                {editMode ? (
                  <div className={A.EditWrapper}>
                    <span className={A.EditInput}>
                      {comma(routineBudget[i] ?? 0)}원
                    </span>
                  </div>
                ) : (
                  <span>{comma(routineBudget[i] ?? 0)}원</span>
                )}
              </li>
            ))}
          </ul>

          <div className={A.PlusBtnContainer}>
            <button
              className={A.PlusBtn}
              onClick={() =>
                navigate('/add-category', {
                  state: { from: '/money-routine', budgetId },
                })
              }
            >
              <img
                className="w-[5.8rem] h-[5.8rem]"
                src={plusCircle}
                alt="add"
              />
            </button>
          </div>

          <button
            className={A.ConfirmBtn(!canConfirm)}
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            확인
          </button>
        </section>
      </main>

      {modalOpen && (
        <div className={A.Dim}>
          <div className={A.Modal}>
            <div className={A.ModalHead}>
              <img
                className={A.Close}
                src={closeIcon}
                alt="close"
                onClick={() => setModalOpen(false)}
              />
              <span className={A.ModalTitle}>한 달 예산</span>
            </div>

            <div className={A.InputRow}>
              <input
                readOnly
                value={raw ? comma(raw) : ''}
                className={A.Money(!!raw)}
              />
              <span className={A.Unit}>원</span>
              <img
                className={A.InputIcon}
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setRaw('')}
              />
            </div>

            <div className={A.Pad}>
              {[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '00',
                '0',
                '←',
              ].map((k) => (
                <button
                  key={k}
                  className={A.Key}
                  onClick={() => pressKey(k === '←' ? 'back' : k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className={A.ApplyContainer}>
              <button
                className={A.Apply(!raw)}
                disabled={!raw}
                onClick={applyValue}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;
