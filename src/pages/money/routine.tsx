import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import editPencilIcon from '../../assets/images/budget/editPencil.png';
import closeIcon from '../../assets/images/budget/Close.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';

import {
  Wrap,
  Body,
  Section,
  Row,
  Label,
  IconBtn,
  Month,
  Divider,
  CatUl,
  CatLi,
  EditWrapper,
  EditInput,
  PlusBtnContainer,
  PlusBtn,
  ConfirmBtn,
  Dim,
  Modal,
  ModalHead,
  Close,
  InputRow,
  Money as MoneyInput,
  InputIcon,
  Pad,
  Key,
  ApplyContainer,
  Apply,
} from '../../styles/budget/routine.styles';

// ✅ 예산 상세 조회 훅 ( /api/house-holds/budgets/{budgetId} )
import { useBudgetDetailQuery } from '../../hooks/money/registration/useBudgetDetailQuery';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const Routine = () => {
  const navigate = useNavigate();

  // money.tsx의 플러스 버튼에서 넘겨주는 budgetId 사용
  const location = useLocation() as { state?: { budgetId?: number } };
  const budgetId = location?.state?.budgetId ?? 0;

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [customCats, setCustomCats] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [targetIdx, setTargetIdx] = useState<-1 | number>(-1);
  const [targetCustom, setTargetCustom] = useState(false);

  // ---- 예산 상세 불러오기 ----
  // 훅 내부에서 0이면 호출 안 하도록 되어 있다면 그대로 사용, 아니라면 budgetId > 0 일 때만 호출하도록 내부 구현이 이미 되어 있음.
  const { data: budgetDetailData } = useBudgetDetailQuery(budgetId || 0);

  // API 데이터 → 화면 상태로 매핑 + 기존 저장 로직과 호환되도록 localStorage 채워주기
  useEffect(() => {
    const result = budgetDetailData?.result;
    if (!result) return;

    // 총 예산
    const total = Number(result.totalBudget ?? 0);
    setMonthBudget(total);

    // 기본 카테고리 금액 맵
    const defaultList: Array<{ categoryName: string; amount: number }> =
      result.defaultCategoryBudgets ?? [];

    const defaultMap = new Map(
      defaultList.map((c) => [c.categoryName, Number(c.amount || 0)]),
    );

    // 화면 상수 순서에 맞춰 배열 구성
    const nextCatBudget = DEFAULT_CATEGORIES.map(
      (name) => defaultMap.get(name) ?? 0,
    );
    setCatBudget(nextCatBudget);

    // 커스텀 카테고리
    const customList: Array<{ categoryName: string; amount: number }> =
      result.customCategoryBudgets ?? [];

    const nextCustomCats = customList.map((c) => c.categoryName);
    const nextCustomBudget = customList.map((c) => Number(c.amount || 0));
    setCustomCats(nextCustomCats);
    setCustomBudget(nextCustomBudget);

    // ✅ 기존 로직(합계 검증/등록)과 호환을 위해 localStorage에도 동기화
    localStorage.setItem('monthBudget', String(total));
    localStorage.setItem('categoryBudgets', JSON.stringify(nextCatBudget));
    localStorage.setItem('customCategories', JSON.stringify(nextCustomCats));
    localStorage.setItem(
      'customCategoryBudgets',
      JSON.stringify(nextCustomBudget),
    );
    localStorage.setItem(
      'totalRoutineBudget',
      JSON.stringify([...nextCatBudget, ...nextCustomBudget]),
    );
  }, [budgetDetailData]);

  const comma = (v: string | number) =>
    String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const pressKey = (k: string) =>
    setRaw((prev) =>
      k === 'back' ? prev.slice(0, -1) : (prev + k).replace(/^0+(?=\d)/, ''),
    );

  const openModal = (idx: number, isCustom = false) => {
    setTargetIdx(idx);
    setTargetCustom(isCustom);
    setRaw(
      idx === -1
        ? String(monthBudget)
        : isCustom
          ? String(customBudget[idx])
          : String(catBudget[idx]),
    );
    setModalOpen(true);
  };

  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;

    if (targetIdx === -1) {
      setMonthBudget(n);
      localStorage.setItem('monthBudget', String(n));
    } else if (!targetCustom) {
      setCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('categoryBudgets', JSON.stringify(next));
        localStorage.setItem(
          'totalRoutineBudget',
          JSON.stringify([...next, ...customBudget]),
        );
        return next;
      });
    } else {
      setCustomBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        localStorage.setItem('customCategoryBudgets', JSON.stringify(next));
        localStorage.setItem(
          'totalRoutineBudget',
          JSON.stringify([...catBudget, ...next]),
        );
        return next;
      });
    }
    setModalOpen(false);
    setRaw('');
  };

  const canConfirm =
    monthBudget > 0 &&
    monthBudget === [...catBudget, ...customBudget].reduce((a, b) => a + b, 0);

  const handleConfirm = () => {
    if (!canConfirm) return;

    // 최종 값 동기화(안전차)
    localStorage.setItem('monthBudget', String(monthBudget));
    localStorage.setItem('categoryBudgets', JSON.stringify(catBudget));
    localStorage.setItem('customCategories', JSON.stringify(customCats));
    localStorage.setItem('customCategoryBudgets', JSON.stringify(customBudget));
    localStorage.setItem(
      'totalRoutineBudget',
      JSON.stringify([...catBudget, ...customBudget]),
    );

    // routine-registration 화면으로 이동 (budgetId 그대로 전달)
    navigate('/routine-registration', {
      replace: true,
      state: { budgetId },
    });
  };

  return (
    <Wrap>
      <Header title="소비 루틴 등록" />

      <Body>
        <Section>
          <Label>한 달 예산</Label>
          <Row>
            <Month>{comma(monthBudget)}원</Month>
            <IconBtn onClick={() => openModal(-1)}>
              <img src={pencilIcon} alt="edit" />
            </IconBtn>
          </Row>
        </Section>

        <Divider />

        <Section>
          <Row>
            <Label>나의 소비 루틴</Label>
            <IconBtn
              $active={editMode}
              onClick={() => setEditMode((v) => !v)}
              style={{ width: '2rem', height: '2rem' }}
            >
              <img src={editPencilIcon} alt="edit" />
            </IconBtn>
          </Row>

          <CatUl>
            {DEFAULT_CATEGORIES.map((c, i) => (
              <CatLi
                key={c}
                $editable={editMode}
                onClick={() => editMode && openModal(i, false)}
              >
                <span className="CatP">{c}</span>
                {editMode ? (
                  <EditWrapper>
                    <EditInput>{comma(catBudget[i])}원</EditInput>
                  </EditWrapper>
                ) : (
                  <span>{comma(catBudget[i])}원</span>
                )}
              </CatLi>
            ))}

            {customCats.map((name, i) => (
              <CatLi
                key={`${name}-${i}`}
                $editable={editMode}
                onClick={() => editMode && openModal(i, true)}
              >
                <span>{name}</span>
                {editMode ? (
                  <EditWrapper>
                    <EditInput>{comma(customBudget[i])}원</EditInput>
                  </EditWrapper>
                ) : (
                  <span>{comma(customBudget[i])}원</span>
                )}
              </CatLi>
            ))}
          </CatUl>

          <PlusBtnContainer>
            <PlusBtn
              onClick={() =>
                navigate('/add-category', { state: { from: '/routine' } })
              }
            >
              <img src={plusCircle} alt="add" />
            </PlusBtn>
          </PlusBtnContainer>

          <ConfirmBtn disabled={!canConfirm} onClick={handleConfirm}>
            확인
          </ConfirmBtn>
        </Section>
      </Body>

      {modalOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <Close
                src={closeIcon}
                alt="close"
                onClick={() => setModalOpen(false)}
              />
              <span>한 달 예산</span>
            </ModalHead>

            <InputRow>
              <MoneyInput
                readOnly
                value={raw ? comma(raw) : ''}
                hasValue={!!raw}
              />
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

export default Routine;
