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
  DeleteToggleBtn,
  Month,
  Divider,
  CatUl,
  CatLi,
  EditWrapper,
  EditInput,
  RightBox,
  DeleteBtn,
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
} from '../../styles/budget/registration.styles';

const CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];

const BudgetRegister = () => {
  const navigate = useNavigate();

  const [monthBudget, setMonthBudget] = useState(0);
  const [catBudget, setCatBudget] = useState<number[]>(Array(5).fill(0));
  const [editMode, setEditMode] = useState(false);
  const [myEditMode, setMyEditMode] = useState(false);
  const [myDeleteMode, setMyDeleteMode] = useState(false);
  const [myCategories, setMyCategories] = useState<string[]>([]);
  const [myCatBudget, setMyCatBudget] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const [targetIdx, setTargetIdx] = useState<-1 | number>(-1);
  const [targetIsCustom, setTargetIsCustom] = useState(false);

  useEffect(() => {
    const savedCats = JSON.parse(
      localStorage.getItem('customCategories') || '[]',
    );
    setMyCategories(savedCats);
    setMyCatBudget(Array(savedCats.length).fill(0));

    const savedMonth = Number(localStorage.getItem('monthBudget') || 0);
    if (savedMonth) setMonthBudget(savedMonth);

    const savedCatBudgets = JSON.parse(
      localStorage.getItem('categoryBudgets') || '[]',
    );
    if (savedCatBudgets.length === 5) setCatBudget(savedCatBudgets);

    const savedMyBudgets = JSON.parse(
      localStorage.getItem('customCategoryBudgets') || '[]',
    );
    if (savedMyBudgets.length) setMyCatBudget(savedMyBudgets);
  }, []);

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
        return next;
      });
    } else {
      setMyCatBudget((prev) => {
        const next = [...prev];
        next[targetIdx] = n;
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
  const canConfirm =
    monthBudget > 0 && monthBudget === totalDefault + totalCustom;

  const handleConfirm = () => {
    if (!canConfirm) return;

    localStorage.setItem('monthBudget', String(monthBudget));
    localStorage.setItem('categoryBudgets', JSON.stringify(catBudget));
    localStorage.setItem('customCategoryBudgets', JSON.stringify(myCatBudget));

    navigate('/money', { replace: true });
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
            <Label>카테고리 별 예산</Label>
            <IconBtn $active={editMode} onClick={() => setEditMode((v) => !v)}>
              <img src={pencilIcon} alt="edit" />
            </IconBtn>
          </Row>

          <CatUl>
            {CATEGORIES.map((c, i) => (
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
          </CatUl>
        </Section>

        {myCategories.length > 0 && (
          <Section>
            <Row>
              <Label>내 카테고리</Label>

              <IconBtn
                style={{ marginRight: 4 }}
                $active={myEditMode}
                onClick={() => setMyEditMode((v) => !v)}
              >
                <img src={pencilIcon} alt="edit" />
              </IconBtn>

              <DeleteToggleBtn
                $active={myDeleteMode}
                onClick={() => setMyDeleteMode((v) => !v)}
              >
                —
              </DeleteToggleBtn>
            </Row>

            <CatUl>
              {myCategories.map((name, i) => (
                <CatLi
                  key={name}
                  $editable={myEditMode || myDeleteMode}
                  onClick={() =>
                    myEditMode && !myDeleteMode && openModal(i, true)
                  }
                >
                  <span>{name}</span>

                  <RightBox>
                    {myEditMode && !myDeleteMode ? (
                      <EditWrapper>
                        <EditInput>{comma(myCatBudget[i] || 0)}원</EditInput>
                      </EditWrapper>
                    ) : (
                      <span>{comma(myCatBudget[i] || 0)}원</span>
                    )}

                    {myDeleteMode && (
                      <DeleteBtn onClick={() => deleteCategory(i)}>×</DeleteBtn>
                    )}
                  </RightBox>
                </CatLi>
              ))}
            </CatUl>
          </Section>
        )}
      </Body>

      <PlusBtn onClick={() => navigate('/add-category')}>
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

export default BudgetRegister;
