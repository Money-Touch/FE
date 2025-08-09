import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../../assets/images/header/leftArrow.png';
import pencilIcon from '../../assets/images/budget/Pencil.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';

import {
  Wrap,
  Header,
  IconBtnLeft,
  H1,
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
  PlusBtn,
  ConfirmBtn,
  Dim,
  Modal,
  ModalHead,
  Close,
  InputRow,
  Money,
  Won,
  Pad,
  Key,
  Apply,
} from '../../styles/budget/routine.styles';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const Routine = () => {
  const navigate = useNavigate();

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [customCats, setCustomCats] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<number[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [targetIdx, setTargetIdx] = useState<-1 | number>(-1);
  const [targetCustom, setTargetCustom] = useState(false);

  useEffect(() => {
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
  }, []);

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
    } else if (!targetCustom) {
      setCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
        return next;
      });
    } else {
      setCustomBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
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

    localStorage.setItem('monthBudget', String(monthBudget));
    localStorage.setItem('categoryBudgets', JSON.stringify(catBudget));
    localStorage.setItem('customCategoryBudgets', JSON.stringify(customBudget));
    localStorage.setItem(
      'totalRoutineBudget',
      JSON.stringify([...catBudget, ...customBudget]),
    );

    navigate('/routine-registration', { replace: true });
  };

  return (
    <Wrap>
      <Header>
        <IconBtnLeft onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <H1>예산 등록</H1>
      </Header>

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
            <Label>소비 루틴</Label>
            <IconBtn $active={editMode} onClick={() => setEditMode((v) => !v)}>
              <img src={pencilIcon} alt="edit" />
            </IconBtn>
          </Row>

          <CatUl>
            {DEFAULT_CATEGORIES.map((c, i) => (
              <CatLi
                key={c}
                $editable={editMode}
                onClick={() => editMode && openModal(i, false)}
              >
                <span>{c}</span>
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
                key={name}
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
        </Section>
      </Body>

      <PlusBtn
        onClick={() =>
          navigate('/add-category', { state: { from: '/routine' } })
        }
      >
        <img src={plusCircle} alt="add" />
      </PlusBtn>

      <ConfirmBtn disabled={!canConfirm} onClick={handleConfirm}>
        확인
      </ConfirmBtn>

      {modalOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <span>금액 입력</span>
              <Close onClick={() => setModalOpen(false)}>×</Close>
            </ModalHead>

            <InputRow>
              <Money readOnly value={raw ? comma(raw) : ''} placeholder="0" />
              <Won>원</Won>
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

            <Apply disabled={!raw} onClick={applyValue}>
              수정하기
            </Apply>
          </Modal>
        </Dim>
      )}
    </Wrap>
  );
};

export default Routine;
