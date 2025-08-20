import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import editPencilIcon from '../../assets/images/budget/editPencil.png';
import closeIcon from '../../assets/images/budget/Close.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';
import minusIcon from '../../assets/images/budget/minus.png';
import { useBudgetMutation } from '../../hooks/money/registration/useBudgetsMutation';
import { useRoutineMutation } from '../../hooks/money/registration/useRoutineMutation';
import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';
import { useRoutineDetailQuery } from '../../hooks/money/registration/useRoutineDetailQuery';
import * as R from '../../styles/budget/registration.styles';
import type { RegistrationState } from '../../types/money/registration/registration';

const CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const BudgetRegister = () => {
  const navigate = useNavigate();

  const { state } = useLocation() as {
    state?: RegistrationState;
  };

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [budgetId, setBudgetId] = useState<number | null>(null);
  const [routineId, setRoutineId] = useState<number | null>(null);

  useEffect(() => {
    const syncStateWithStorage = <T extends string | number>(
      key: string,
      value: T | undefined,
      setter: (val: T) => void,
      parser: (s: string) => T,
    ) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(key, String(value));
        setter(value);
      } else {
        const saved = localStorage.getItem(key);
        if (saved) setter(parser(saved));
      }
    };

    syncStateWithStorage('year', state?.year, setYear, Number);
    syncStateWithStorage('month', state?.month, setMonth, Number);
    syncStateWithStorage('budgetId', state?.budgetId, setBudgetId, Number);
    syncStateWithStorage('routineId', state?.routineId, setRoutineId, Number);
  }, [state?.year, state?.month, state?.budgetId, state?.routineId]);

  const { data: budgetDetail } = useBudgetDetailQuery(budgetId!);
  const { data: routineDetail } = useRoutineDetailQuery(routineId!);
  const budgetMutation = useBudgetMutation();
  const routineMutation = useRoutineMutation();

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [editMode, setEditMode] = useState(false);
  const [myEditMode, setMyEditMode] = useState(false);
  const [routineEditMode, setRoutineEditMode] = useState(false);
  const [myDeleteMode, setMyDeleteMode] = useState(false);
  const [routineDeleteMode, setRoutineDeleteMode] = useState(false);
  const [myCategories, setMyCategories] = useState<string[]>([]);
  const [myCatBudget, setMyCatBudget] = useState<number[]>([]);
  const [routineCategories, setRoutineCategories] = useState<string[]>([]);
  const [routineCatBudget, setRoutineCatBudget] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [targetIdx, setTargetIdx] = useState<-1 | number>(-1);
  const [targetIsCustom, setTargetIsCustom] = useState(false);
  const [targetIsRoutine, setTargetIsRoutine] = useState(false);

  const source =
    budgetDetail?.result ?? (!budgetId ? routineDetail?.result : null);

  useEffect(() => {
    if (!source) return;

    const {
      totalBudget,
      defaultCategoryBudgets = [],
      customCategoryBudgets = [],
      routineCategoryBudgets = [],
    } = source;

    const defaultArr = CATEGORIES.map(
      (name) =>
        defaultCategoryBudgets.find((c) => c.categoryName === name)?.amount ??
        0,
    );

    const customNames = customCategoryBudgets?.map((c) => c.categoryName) ?? [];
    const customAmounts = customCategoryBudgets?.map((c) => c.amount) ?? [];

    const routineNames =
      routineCategoryBudgets?.map((c) => c.categoryName) ?? [];
    const routineAmounts = routineCategoryBudgets?.map((c) => c.amount) ?? [];

    if (!localStorage.getItem('monthBudget')) {
      localStorage.setItem('monthBudget', String(totalBudget));
      localStorage.setItem('categoryBudgets', JSON.stringify(defaultArr));
      localStorage.setItem('customCategories', JSON.stringify(customNames));
      localStorage.setItem(
        'customCategoryBudgets',
        JSON.stringify(customAmounts),
      );
      localStorage.setItem('routineCategories', JSON.stringify(routineNames));
      localStorage.setItem(
        'routineCategoryBudgets',
        JSON.stringify(routineAmounts),
      );

      setMonthBudget(totalBudget);
      setCatBudget(defaultArr);
      setMyCategories(customNames);
      setMyCatBudget(customAmounts);
      setRoutineCategories(routineNames);
      setRoutineCatBudget(routineAmounts);
    }
  }, [source]);

  useEffect(() => {
    if (!budgetId) {
      const savedCats = JSON.parse(
        localStorage.getItem('customCategories') || '[]',
      );
      setMyCategories(savedCats);

      const savedMonth = Number(localStorage.getItem('monthBudget') || 0);
      if (savedMonth) setMonthBudget(savedMonth);

      const savedCatBudgets = JSON.parse(
        localStorage.getItem('categoryBudgets') || '[]',
      );
      if (savedCatBudgets.length === 5) setCatBudget(savedCatBudgets);

      const savedMyBudgets = JSON.parse(
        localStorage.getItem('customCategoryBudgets') || '[]',
      );
      setMyCatBudget(
        savedMyBudgets.length
          ? savedMyBudgets
          : Array(savedCats.length).fill(0),
      );

      const savedRoutineCats = JSON.parse(
        localStorage.getItem('routineCategories') || '[]',
      );
      const savedRoutineBudgets = JSON.parse(
        localStorage.getItem('routineCategoryBudgets') || '[]',
      );
      setRoutineCategories(savedRoutineCats);
      setRoutineCatBudget(
        savedRoutineBudgets.length
          ? savedRoutineBudgets
          : Array(savedRoutineCats.length).fill(0),
      );
    }
  }, [budgetId]);

  const comma = (v: string | number) =>
    String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const pressKey = (k: string) =>
    setRaw((prev) =>
      k === 'back' ? prev.slice(0, -1) : (prev + k).replace(/^0+(?=\d)/, ''),
    );

  const openModal = (idx: number, isCustom = false, isRoutine = false) => {
    setTargetIdx(idx);
    setTargetIsCustom(isCustom);
    setTargetIsRoutine(isRoutine);
    setModalOpen(true);
  };

  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;

    if (targetIdx === -1) {
      setMonthBudget(n);
      localStorage.setItem('monthBudget', String(n));
    } else if (!targetIsCustom && !targetIsRoutine) {
      setCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('categoryBudgets', JSON.stringify(next));
        return next;
      });
    } else if (targetIsCustom) {
      setMyCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('customCategoryBudgets', JSON.stringify(next));
        return next;
      });
    } else if (targetIsRoutine) {
      setRoutineCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('routineCategoryBudgets', JSON.stringify(next));
        return next;
      });
    }

    setModalOpen(false);
    setRaw('');
  };

  const deleteCategory = (idx: number, type: 'custom' | 'routine') => {
    if (type === 'custom') {
      setMyCategories((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        localStorage.setItem('customCategories', JSON.stringify(next));
        return next;
      });
      setMyCatBudget((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        localStorage.setItem('customCategoryBudgets', JSON.stringify(next));
        return next;
      });
    }
    if (type === 'routine') {
      setRoutineCategories((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        localStorage.setItem('routineCategories', JSON.stringify(next));
        return next;
      });
      setRoutineCatBudget((prev) => {
        const next = prev.filter((_, i) => i !== idx);
        localStorage.setItem('routineCategoryBudgets', JSON.stringify(next));
        return next;
      });
    }
  };

  const totalDefault = catBudget.reduce((a, b) => a + b, 0);
  const totalCustom = myCatBudget.reduce((a, b) => a + b, 0);
  const totalRoutine = routineCatBudget.reduce((a, b) => a + b, 0);
  const canConfirm =
    monthBudget > 0 &&
    monthBudget === totalDefault + totalCustom + totalRoutine;

  const handleConfirm = () => {
    // console.log('routineId', routineId);
    if (!canConfirm) return;

    const defaultCategoryBudgets = CATEGORIES.map((name, idx) => ({
      categoryName: name,
      amount: catBudget[idx],
      categoryType: 'DEFAULT' as const,
    }));

    const customCategoryBudgets = myCategories.map((name, idx) => ({
      categoryName: name,
      amount: myCatBudget[idx],
      categoryType: 'CUSTOM' as const,
    }));

    const routineCategoryBudgets = routineCategories.map((name, idx) => ({
      categoryName: name,
      amount: routineCatBudget[idx],
      categoryType: 'ROUTINE_CATEGORY' as const,
    }));

    const payload = {
      totalBudget: monthBudget,
      defaultCategoryBudgets,
      customCategoryBudgets:
        customCategoryBudgets.length > 0 ? customCategoryBudgets : undefined,
      routineCategoryBudgets:
        routineCategoryBudgets.length > 0 ? routineCategoryBudgets : undefined,
    };

    const onSuccess = (data: any) => {
      alert(
        routineId
          ? '소비 루틴 예산이 반영되었습니다.'
          : '한달 예산이 등록되었습니다.',
      );
      localStorage.removeItem('monthBudget');
      localStorage.removeItem('categoryBudgets');
      localStorage.removeItem('customCategories');
      localStorage.removeItem('customCategoryBudgets');
      localStorage.removeItem('routineCategories');
      localStorage.removeItem('routineCategoryBudgets');
      localStorage.removeItem('year');
      localStorage.removeItem('month');
      localStorage.removeItem('budgetId');
      localStorage.removeItem('routineId');

      navigate('/money', {
        replace: true,
        state: { total: data.result.totalBudget },
      });
    };

    if (routineId) {
      routineMutation.mutate({ routineId, data: payload }, { onSuccess });
    } else {
      budgetMutation.mutate({ year, month, data: payload }, { onSuccess });
    }
  };

  return (
    <div className={R.Wrap}>
      <Header title="예산 등록" bgColor="bg-[var(--color-B1)]" />

      <main className={R.Body}>
        <section className={R.Section}>
          <p className={R.Label}>한 달 예산</p>
          <div className={R.Row}>
            <p className={R.Month}>{comma(monthBudget)}원</p>
            <img
              className={R.IconBtn}
              src={pencilIcon}
              alt="edit"
              onClick={() => openModal(-1, false, false)}
            />
          </div>
        </section>

        <div className={R.Divider} />

        <section className={R.Section}>
          <div className={R.Row}>
            <p className={R.Label}>카테고리 별 예산</p>
            <img
              className={`${R.IconBtn} !w-[2rem] !h-[2rem]`}
              src={editMode ? editPencilIcon : pencilIcon}
              alt="edit"
              onClick={() => setEditMode((v) => !v)}
            />
          </div>

          <ul className={R.CatUl}>
            {CATEGORIES.map((c, i) => (
              <li
                className={R.CatLi(editMode)}
                key={c}
                onClick={() => editMode && openModal(i, false, false)}
              >
                {c}

                {editMode ? (
                  <div className={R.EditWrapper}>
                    <span className={R.EditInput}>{comma(catBudget[i])}원</span>
                  </div>
                ) : (
                  <span>{comma(catBudget[i])}원</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {myCategories.length > 0 && (
          <>
            <div className={R.Divider} />
            <section className={R.Section}>
              <div className={R.RowContainer}>
                <div className={R.Row}>
                  <p className={R.Label}>내 카테고리</p>

                  <img
                    className={`${R.IconBtn} !w-[2rem] !h-[2rem]`}
                    src={
                      myEditMode && !myDeleteMode ? editPencilIcon : pencilIcon
                    }
                    alt="edit"
                    onClick={() => setMyEditMode((v) => !v)}
                  />
                </div>

                <img
                  className={R.DeleteToggleBtn(myDeleteMode)}
                  onClick={() => setMyDeleteMode((v) => !v)}
                  src={minusIcon}
                  alt="delete"
                />
              </div>

              <ul className={R.CatUl}>
                {myCategories.map((name, i) => (
                  <li
                    className={R.CatLi(myEditMode || myDeleteMode)}
                    key={name}
                    onClick={() =>
                      myEditMode && !myDeleteMode && openModal(i, true, false)
                    }
                  >
                    {name}

                    <div className={R.RightBox}>
                      {myEditMode && !myDeleteMode ? (
                        <div className={R.EditWrapper}>
                          <span className={R.EditInput}>
                            {comma(myCatBudget[i] || 0)}원
                          </span>
                        </div>
                      ) : (
                        <span>{comma(myCatBudget[i] || 0)}원</span>
                      )}

                      {myDeleteMode && (
                        <img
                          className={R.DeleteBtn}
                          src={closeIcon}
                          alt="delete"
                          onClick={() => deleteCategory(i, 'custom')}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {routineCategories.length > 0 && (
          <>
            <div className={R.Divider} />
            <section className={R.Section}>
              <div className={R.RowContainer}>
                <div className={R.Row}>
                  <p className={R.Label}>내 소비루틴</p>

                  <img
                    className={R.IconBtn}
                    src={
                      routineEditMode && !routineDeleteMode
                        ? editPencilIcon
                        : pencilIcon
                    }
                    alt="edit"
                    onClick={() => setRoutineEditMode((v) => !v)}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </div>

                <img
                  className={R.DeleteToggleBtn(routineDeleteMode)}
                  onClick={() => setRoutineDeleteMode((v) => !v)}
                  src={minusIcon}
                  alt="delete"
                />
              </div>

              <ul className={R.CatUl}>
                {routineCategories.map((name, i) => (
                  <li
                    className={R.CatLi(routineEditMode || routineDeleteMode)}
                    key={name}
                    onClick={() =>
                      routineEditMode &&
                      !routineDeleteMode &&
                      openModal(i, false, true)
                    }
                  >
                    {name}

                    <div className={R.RightBox}>
                      {routineEditMode && !routineDeleteMode ? (
                        <div className={R.EditWrapper}>
                          <span className={R.EditInput}>
                            {comma(routineCatBudget[i] || 0)}원
                          </span>
                        </div>
                      ) : (
                        <span>{comma(routineCatBudget[i] || 0)}원</span>
                      )}

                      {routineDeleteMode && (
                        <img
                          className={R.DeleteBtn}
                          src={closeIcon}
                          alt="delete"
                          onClick={() => deleteCategory(i, 'routine')}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>

      <div className={R.PlusBtnContainer}>
        <img
          className={R.PlusBtn}
          src={plusCircle}
          alt="add"
          onClick={() => navigate('/add-category')}
        />
      </div>

      <div className={R.ConfirmBtnContainer}>
        <button className={R.ConfirmBtn(!canConfirm)} onClick={handleConfirm}>
          확인
        </button>
      </div>

      {modalOpen && (
        <div className={R.Dim}>
          <div className={R.Modal}>
            <div className={R.ModalHead}>
              <img
                className={R.Close}
                src={closeIcon}
                alt="close"
                onClick={() => setModalOpen(false)}
              />
              <span>
                {targetIdx === -1
                  ? '한 달 예산'
                  : targetIsCustom
                    ? '내 카테고리 예산'
                    : '카테고리별 예산'}
              </span>
            </div>

            <div className={R.InputRow}>
              <input
                className={R.Money(!!raw)}
                readOnly
                value={raw ? comma(raw) : ''}
              />
              <span>원</span>
              <img
                className={R.InputIcon}
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setRaw('')}
              />
            </div>

            <div className={R.Pad}>
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
                  className={R.Key}
                  key={k}
                  onClick={() => pressKey(k === '←' ? 'back' : k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className={R.ApplyContainer}>
              <button className={R.Apply(!raw)} onClick={applyValue}>
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetRegister;
