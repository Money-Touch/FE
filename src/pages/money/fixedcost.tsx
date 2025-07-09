import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/common/colors";
import leftArrow  from "../../assets/images/header/leftArrow.png";
import pencilIcon from "../../assets/images/budget/Pencil.png";

const CATEGORIES = ["배달/외식", "교통", "패션/쇼핑", "카페", "기타"] as const;
const fmtComma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

type LayoutCtx = { setHideFooter: (b: boolean) => void };

const FixedCost = () => {
  const navigate      = useNavigate();
  const outletCtx     = useOutletContext<LayoutCtx | null>();
  const setHideFooter = outletCtx?.setHideFooter;

  useEffect(() => {
    setHideFooter?.(true);
    return () => setHideFooter?.(false);
  }, [setHideFooter]);

  const [category, setCategory] = useState<string>("");
  const [item,     setItem]     = useState("");
  const [amount,   setAmount]   = useState(0);
  const [memo,     setMemo]     = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [raw,       setRaw]       = useState("");

  const valid = category && item.trim();

  const pressKey = (k: string) =>
    setRaw(prev =>
      k === "back" ? prev.slice(0, -1) : (prev + k).replace(/^0+(?=\d)/, "")
    );
  const openModal = () => {
    setRaw(amount ? String(amount) : "");
    setModalOpen(true);
  };
  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;
    setAmount(n);
    setModalOpen(false);
    setRaw("");
  };

  const save = () => {
    if (!valid) return;

    const entry = {
      id:       Date.now(),
      category,
      item:     item.trim(),
      amount:  -Math.abs(amount),
      memo,
    };
    const prev = JSON.parse(localStorage.getItem("fixedEntries") || "[]");
    localStorage.setItem("fixedEntries", JSON.stringify([...prev, entry]));

    navigate("/money", { replace: true, state: { tab: "고정비" } });
  };

  return (
    <Wrap>
      <Header>
        <IconBtnLeft onClick={() => navigate(-1)}>
          <img src={leftArrow} alt="뒤로가기" />
        </IconBtnLeft>
        <H1>고정비</H1>
      </Header>

      <Body>
        <Section>
          <Label2>금액</Label2>
          <Row>
            <AmountBtn onClick={openModal}>
              {fmtComma(amount)}원
              <img src={pencilIcon} alt="금액 수정" />
            </AmountBtn>
          </Row>
        </Section>

        <Divider />

        <Label>
          카테고리 선택<span>*</span>
        </Label>
        <CatBox>
          {CATEGORIES.map((c) => (
            <CatBtn
              key={c}
              $on={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </CatBtn>
          ))}
        </CatBox>

        <Label>
          항목명<span>*</span>
        </Label>
        <Input
          placeholder="지출 항목에 대해 작성해 주세요.(최대 20자)"
          maxLength={20}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <Label>메모</Label>
        <Textarea
          placeholder="1000자 이내로 작성해 주세요."
          maxLength={1000}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <Save disabled={!valid} onClick={save}>
          확인
        </Save>
      </Body>

      {modalOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <span>금액 입력</span>
              <Close onClick={() => setModalOpen(false)}>×</Close>
            </ModalHead>

            <InputRow>
              <Money
                readOnly
                value={raw ? fmtComma(raw) : ""}
                placeholder="0"
              />
              <Won>원</Won>
            </InputRow>

            <Pad>
              {["1","2","3","4","5","6","7","8","9","00","0","←"].map(k => (
                <Key
                  key={k}
                  onClick={() => pressKey(k === "←" ? "back" : k)}
                >
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

export default FixedCost;

const Wrap = styled.div`
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
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
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;

  img,
  svg {
    width: 20px;
    height: 20px;
    display: block;
    object-fit: contain;
  }
`;
const IconBtnLeft = styled(IconBase)`left: 16px;`;

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

const Label2 = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

const Label = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;

  span {
    margin-left: 2px;
    color: ${colors.M1};
  }
`;

const AmountBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  font-size: 28px;
  font-weight: 700;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Divider = styled.hr`
  height: 8px;
  margin: -10px -16px 24px;
  border: none;
  background: ${colors.G8};
`;

const CatBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const CatBtn = styled.button<{ $on: boolean }>`
  padding: 8px 14px;
  border: 1px solid ${colors.G7};
  border-radius: 20px;
  font-size: 14px;
  background: ${({ $on }) => ($on ? colors.mainColor1 : colors.B1)};
  color: ${({ $on }) => ($on ? "#fff" : colors.G3)};
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 24px;

  &::placeholder {
    color: ${colors.G6};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 140px;
  padding: 14px;
  border: 1px solid ${colors.G7};
  border-radius: 10px;
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: ${colors.G6};
  }
`;

const Save = styled.button<{ disabled?: boolean }>`
  margin: 24px 0 160px;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: ${({ disabled }) => (disabled ? colors.G6 : colors.mainColor1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
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
  max-width: 430px;
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
