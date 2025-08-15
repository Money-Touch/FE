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
import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';

import {
  Wrap,
  Body,
  Section,
  RowContainer,
  Row,
  Label,
  IconBtn,
  DeleteToggleBtn,
  Month,
  Divider,
  CatUl,
  CatLi,
  EditWrapper,
  EditInput,
  RightBox,
  DeleteBtn,
  PlusBtnContainer,
  PlusBtn,
  ConfirmBtnContainer,
  ConfirmBtn,
  Dim,
  Modal,
  ModalHead,
  Close,
  InputRow,
  Money,
  InputIcon,
  Pad,
  Key,
  ApplyContainer,
  Apply,
} from '../../styles/budget/registration.styles';

const CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const BudgetRegister = () => {
  const navigate = useNavigate();
  // 인서 추가
  const { state } = useLocation() as {
    state?: { year?: number; month?: number; budgetId?: number };
  };
  const year = state?.year ?? new Date().getFullYear();
  const month = state?.month ?? new Date().getMonth() + 1;
  const budgetId = state?.budgetId;

  const budgetMutation = useBudgetMutation();
  const { data: budgetDetail } = useBudgetDetailQuery(budgetId);
  console.log(budgetId);
  console.log(budgetDetail);
  //

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

  // 인서 추가
  useEffect(() => {
    if (budgetDetail?.result) {
      const {
        totalBudget,
        defaultCategoryBudgets,
        customCategoryBudgets,
        routineCategoryBudgets,
      } = budgetDetail.result;

      const defaultArr = CATEGORIES.map(
        (name) =>
          defaultCategoryBudgets.find((c) => c.categoryName === name)?.amount ??
          0,
      );

      const customNames =
        customCategoryBudgets?.map((c) => c.categoryName) ?? [];
      const customAmounts = customCategoryBudgets?.map((c) => c.amount) ?? [];

      const routineNames =
        routineCategoryBudgets?.map((c) => c.categoryName) ?? [];
      const routineAmounts = routineCategoryBudgets?.map((c) => c.amount) ?? [];

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
  }, [budgetDetail]);

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

  const openModal = (idx: number, isCustom = false) => {
    setTargetIdx(idx);
    setTargetIsCustom(isCustom);
    setModalOpen(true);
  };

  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;

    if (targetIdx === -1) {
      setMonthBudget(n);
      localStorage.setItem('monthBudget', String(n));
    } else if (!targetIsCustom) {
      setCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('categoryBudgets', JSON.stringify(next));
        return next;
      });
    } else {
      setMyCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('customCategoryBudgets', JSON.stringify(next));
        return next;
      });
    }
    setModalOpen(false);
    setRaw('');
  };

  const deleteCategory = (idx: number) => {
    setMyCategories((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      localStorage.setItem('customCategories', JSON.stringify(next));
      return next;
    });
    setMyCatBudget((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalDefault = catBudget.reduce((a, b) => a + b, 0);
  const totalCustom = myCatBudget.reduce((a, b) => a + b, 0);
  const totalRoutine = routineCatBudget.reduce((a, b) => a + b, 0);
  const canConfirm =
    monthBudget > 0 &&
    monthBudget === totalDefault + totalCustom + totalRoutine;

  const handleConfirm = () => {
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

    budgetMutation.mutate(
      {
        year,
        month,
        data: {
          totalBudget: monthBudget,
          defaultCategoryBudgets,
          customCategoryBudgets:
            customCategoryBudgets.length > 0
              ? customCategoryBudgets
              : undefined,
        },
      },
      {
        onSuccess: (data) => {
          alert('한달 예산이 등록되었습니다.');
          // console.log(data);
          localStorage.removeItem('monthBudget');
          localStorage.removeItem('categoryBudgets');
          localStorage.removeItem('customCategories');
          localStorage.removeItem('customCategoryBudgets');
          localStorage.removeItem('routineCategories');
          localStorage.removeItem('routineCategoryBudgets');

          navigate('/money', {
            replace: true,
            state: { total: data.result.totalBudget },
          });
          console.log(data.totalBudget);
        },
      },
    );
  };

  return (
    <Wrap>
      <Header title="예산 등록" bgColor="bg-[var(--color-B1)]" />

      <Body>
        <Section>
          <Label>한 달 예산</Label>
          <Row>
            <Month>{comma(monthBudget)}원</Month>
            <IconBtn
              src={pencilIcon}
              alt="edit"
              onClick={() => openModal(-1)}
            />
          </Row>
        </Section>

        <Divider />

        <Section>
          <Row>
            <Label>카테고리 별 예산</Label>
            <IconBtn
              src={editMode ? editPencilIcon : pencilIcon}
              alt="edit"
              onClick={() => setEditMode((v) => !v)}
              style={{ width: '2rem', height: '2rem' }}
            />
          </Row>

          <CatUl>
            {CATEGORIES.map((c, i) => (
              <CatLi
                key={c}
                $editable={editMode}
                onClick={() => editMode && openModal(i, false)}
              >
                {c}

                {editMode ? (
                  <EditWrapper>
                    <EditInput>{comma(catBudget[i])}원</EditInput>
                  </EditWrapper>
                ) : (
                  <span>{comma(catBudget[i])}원</span>
                )}
              </CatLi>
            ))}
          </CatUl>
        </Section>

        {myCategories.length > 0 && (
          <>
            <Divider />
            <Section>
              <RowContainer>
                <Row>
                  <Label>내 카테고리</Label>

                  <IconBtn
                    src={
                      myEditMode && !myDeleteMode ? editPencilIcon : pencilIcon
                    }
                    alt="edit"
                    onClick={() => setMyEditMode((v) => !v)}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </Row>

                <DeleteToggleBtn
                  $active={myDeleteMode}
                  onClick={() => setMyDeleteMode((v) => !v)}
                  src={minusIcon}
                  alt="delete"
                />
              </RowContainer>

              <CatUl>
                {myCategories.map((name, i) => (
                  <CatLi
                    key={name}
                    $editable={myEditMode || myDeleteMode}
                    onClick={() =>
                      myEditMode && !myDeleteMode && openModal(i, true)
                    }
                  >
                    {name}

                    <RightBox>
                      {myEditMode && !myDeleteMode ? (
                        <EditWrapper>
                          <EditInput>{comma(myCatBudget[i] || 0)}원</EditInput>
                        </EditWrapper>
                      ) : (
                        <span>{comma(myCatBudget[i] || 0)}원</span>
                      )}

                      {myDeleteMode && (
                        <DeleteBtn
                          src={closeIcon}
                          alt="delete"
                          onClick={() => deleteCategory(i)}
                        />
                      )}
                    </RightBox>
                  </CatLi>
                ))}
              </CatUl>
            </Section>
          </>
        )}

        {routineCategories.length > 0 && (
          <>
            <Divider />
            <Section>
              <RowContainer>
                <Row>
                  <Label>내 소비루틴</Label>

                  <IconBtn
                    src={
                      routineEditMode && !routineDeleteMode
                        ? editPencilIcon
                        : pencilIcon
                    }
                    alt="edit"
                    onClick={() => setRoutineEditMode((v) => !v)}
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </Row>

                <DeleteToggleBtn
                  $active={routineDeleteMode}
                  onClick={() => setRoutineDeleteMode((v) => !v)}
                  src={minusIcon}
                  alt="delete"
                />
              </RowContainer>

              <CatUl>
                {routineCategories.map((name, i) => (
                  <CatLi
                    key={name}
                    $editable={routineEditMode || routineDeleteMode}
                    onClick={() =>
                      routineEditMode &&
                      !routineDeleteMode &&
                      openModal(i, true)
                    }
                  >
                    {name}

                    <RightBox>
                      {routineEditMode && !routineDeleteMode ? (
                        <EditWrapper>
                          <EditInput>
                            {comma(routineCatBudget[i] || 0)}원
                          </EditInput>
                        </EditWrapper>
                      ) : (
                        <span>{comma(routineCatBudget[i] || 0)}원</span>
                      )}

                      {routineDeleteMode && (
                        <DeleteBtn
                          src={closeIcon}
                          alt="delete"
                          onClick={() => deleteCategory(i)}
                        />
                      )}
                    </RightBox>
                  </CatLi>
                ))}
              </CatUl>
            </Section>
          </>
        )}
      </Body>

      <PlusBtnContainer>
        <PlusBtn
          src={plusCircle}
          alt="add"
          onClick={() => navigate('/add-category')}
        />
      </PlusBtnContainer>

      <ConfirmBtnContainer>
        <ConfirmBtn disabled={!canConfirm} onClick={handleConfirm}>
          확인
        </ConfirmBtn>
      </ConfirmBtnContainer>

      {modalOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <Close
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
            </ModalHead>

            <InputRow>
              <Money readOnly value={raw ? comma(raw) : ''} hasValue={!!raw} />
              <span>원</span>
              <InputIcon
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setRaw('')}
              />
            </InputRow>

            <Pad>
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
                <Key key={k} onClick={() => pressKey(k === '←' ? 'back' : k)}>
                  {k}
                </Key>
              ))}
            </Pad>

            <ApplyContainer>
              <Apply disabled={!raw} onClick={applyValue}>
                수정하기
              </Apply>
            </ApplyContainer>
          </Modal>
        </Dim>
      )}
    </Wrap>
  );
};

export default BudgetRegister;
