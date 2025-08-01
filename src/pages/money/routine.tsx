import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from '../../styles/common/colors';
import leftArrow from '../../assets/images/header/leftArrow.png';
import pencilIcon from '../../assets/images/budget/Pencil.png';
import plusCircle from '../../assets/images/budget/Plus-2.png';

const DEFAULT_CATEGORIES = ['배달/외식', '패션/쇼핑', '교통', '카페', '기타'];
const MOBILE_MAX = '430px';

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

  img {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }
`;

const IconBtnLeft = styled(IconBase)`
  left: 16px;
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

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

const IconBtn = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;

  img {
    width: 20px;
    height: 20px;

    ${({ $active }) =>
      $active &&
      css`
        filter: hue-rotate(140deg);
      `}
  }
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

const CatLi = styled.li<{ $editable: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;

  ${({ $editable }) =>
    $editable &&
    css`
      cursor: pointer;
    `}
`;

const EditWrapper = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
`;

const EditInput = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black};
  border-bottom: 1.5px solid ${colors.mainColor1};
  padding-bottom: 2px;
  text-align: right;
`;

const PlusBtn = styled.button`
  position: absolute;
  right: 16px;
  bottom: 240px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 56px;
    height: 56px;
  }
`;

const ConfirmBtn = styled.button<{ disabled?: boolean }>`
  width: calc(100% - 32px);
  margin: 0 16px 160px;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;

const Dim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Modal = styled.div`
  width: 100%;
  max-width: ${MOBILE_MAX};
  background: #fff;
  border-radius: 28px 28px 0 0;
  display: flex;
  flex-direction: column;
  animation: slide-up 0.25s ease;

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px 18px;
  font-size: 18px;
  font-weight: 700;
`;

const Close = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  line-height: 1;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid ${colors.mainColor1};
  padding: 0 20px 6px;
`;

const Money = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 28px;
  font-weight: 600;
  text-align: right;
`;

const Won = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.G4};
  margin-left: 6px;
`;

const Pad = styled.div`
  background: #e6faf5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Key = styled.button`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.G1};
  padding: 20px 0;
  background: none;
  border: none;

  &:active {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Apply = styled.button<{ disabled?: boolean }>`
  margin: 20px;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
`;
