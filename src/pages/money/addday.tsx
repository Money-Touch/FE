import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import leftArrow from '../../assets/images/header/leftArrow.png';
import pencilIcon from '../../assets/images/budget/Pencil.png';
import {
  Wrap,
  Header,
  IconBtnLeft,
  H1,
  Body,
  Section,
  Row,
  Label2,
  Label,
  AmountBtn,
  Divider,
  CatBox,
  CatBtn,
  Input,
  DateBtn,
  Textarea,
  Save,
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
  DateModal,
  WheelWrap,
  WheelCol,
  WheelSpacer,
  WheelItem,
  WheelCenter,
} from '../../styles/budget/addday.styles';

const CATEGORIES = ['배달/외식', '교통', '패션/쇼핑', '카페', '기타'] as const;
const ROW_H = 44;

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const two = (n: number) => String(n).padStart(2, '0');
const weekdayKo = ['일', '월', '화', '수', '목', '금', '토'] as const;
const fmtDateKo = (d: Date) =>
  `${d.getMonth() + 1}월${d.getDate()}일 ${weekdayKo[d.getDay()]}`;
const toLocalDt = (d: Date) =>
  `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}T${two(
    d.getHours(),
  )}:${two(d.getMinutes())}`;

type LayoutCtx = { setHideFooter: (b: boolean) => void };

const AddDay = () => {
  const nav = useNavigate();
  const layoutCtx = useOutletContext<LayoutCtx | null>();
  const hideFooter = layoutCtx?.setHideFooter;
  useEffect(() => {
    hideFooter?.(true);
    return () => hideFooter?.(false);
  }, [hideFooter]);

  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateStr, setDateStr] = useState('');
  const [memo, setMemo] = useState('');

  const [padOpen, setPadOpen] = useState(false);
  const [rawAmt, setRawAmt] = useState('');

  const [dateOpen, setDateOpen] = useState(false);

  const dateList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 61 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i - 30);
      return d;
    });
  }, []);
  const hours12 = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    [],
  );
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  const [idxDate, setIdxDate] = useState(30);
  const [meri, setMeri] = useState<'오전' | '오후'>('오전');
  const [hour12, setHour12] = useState(12);
  const [minute, setMinute] = useState(0);

  const dateRef = useRef<HTMLDivElement>(null);
  const meriRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);

  const openDate = () => {
    const base = dateStr ? new Date(dateStr) : new Date();
    const today0 = new Date();
    today0.setHours(0, 0, 0, 0);
    const diff = Math.round((+base.setHours(0, 0, 0, 0) - +today0) / 864e5);
    const idx = 30 + Math.max(-30, Math.min(30, diff));

    const hr = base.getHours();
    const initMeri = hr >= 12 ? '오후' : '오전';
    const initHour12 = hr % 12 || 12;
    const initMin = base.getMinutes();

    setIdxDate(idx);
    setMeri(initMeri);
    setHour12(initHour12);
    setMinute(initMin);
    setDateOpen(true);

    requestAnimationFrame(() => {
      const baseTop = idx * ROW_H;
      dateRef.current?.scrollTo(0, baseTop);
      meriRef.current?.scrollTo(0, (initMeri === '오후' ? 3 : 2) * ROW_H);
      hourRef.current?.scrollTo(0, (initHour12 - 1) * ROW_H);
      minRef.current?.scrollTo(0, initMin * ROW_H);
    });
  };

  const applyDate = () => {
    const d = new Date(dateList[idxDate]);
    let h24 = hour12 % 12;
    if (meri === '오후') h24 += 12;
    if (meri === '오전' && hour12 === 12) h24 = 0;
    d.setHours(h24, minute, 0, 0);
    setDateStr(toLocalDt(d));
    setDateOpen(false);
  };

  const press = (k: string) =>
    setRawAmt((p) =>
      k === 'back' ? p.slice(0, -1) : (p + k).replace(/^0+(?=\d)/, ''),
    );
  const saveAmt = () => {
    const n = +rawAmt;
    if (!isNaN(n)) setAmount(n);
    setPadOpen(false);
  };

  const valid = category && item.trim() && dateStr;
  const save = () => {
    if (!valid) return;
    const entry = {
      id: Date.now(),
      category,
      item: item.trim(),
      amount: -Math.abs(amount),
      date: dateStr,
      memo,
    };
    const prev = JSON.parse(localStorage.getItem('dailyEntries') || '[]');
    localStorage.setItem('dailyEntries', JSON.stringify([...prev, entry]));
    nav('/money', { state: { tab: '일일' } });
  };

  const snap = (
    e: React.UIEvent<HTMLDivElement>,
    setIdx: (i: number) => void,
  ) => {
    const top = e.currentTarget.scrollTop;
    const i = Math.round(top / ROW_H);
    setIdx(i);
  };

  return (
    <Wrap>
      <Header>
        <IconBtnLeft onClick={() => nav(-1)}>
          <img src={leftArrow} alt="back" />
        </IconBtnLeft>
        <H1>일일</H1>
      </Header>

      <Body>
        <Section>
          <Label2>거래처</Label2>
          <Row>
            <AmountBtn
              onClick={() => {
                setRawAmt(amount ? String(amount) : '');
                setPadOpen(true);
              }}
            >
              {comma(amount)}원
              <img src={pencilIcon} alt="" />
            </AmountBtn>
          </Row>
        </Section>

        <Divider />

        <Label>
          카테고리 선택<span>*</span>
        </Label>
        <CatBox>
          {CATEGORIES.map((c) => (
            <CatBtn key={c} $on={c === category} onClick={() => setCategory(c)}>
              {c}
            </CatBtn>
          ))}
        </CatBox>

        <Label>
          항목명<span>*</span>
        </Label>
        <Input
          value={item}
          maxLength={20}
          placeholder="지출 항목을 입력..."
          onChange={(e) => setItem(e.target.value)}
        />

        <Label>
          날짜<span>*</span>
        </Label>
        <DateBtn $placeholder={!dateStr} onClick={openDate}>
          {dateStr
            ? (() => {
                const d = new Date(dateStr);
                const ap = d.getHours() >= 12 ? '오후' : '오전';
                const h = d.getHours() % 12 || 12;
                return `${fmtDateKo(d)}  ${ap} ${two(h)}:${two(
                  d.getMinutes(),
                )}`;
              })()
            : '날짜를 입력하세요.'}
        </DateBtn>

        <Label>메모</Label>
        <Textarea
          value={memo}
          maxLength={1000}
          placeholder="1000자 이내로 작성"
          onChange={(e) => setMemo(e.target.value)}
        />

        <Save disabled={!valid} onClick={save}>
          확인
        </Save>
      </Body>

      {padOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <span>금액 입력</span>
              <Close onClick={() => setPadOpen(false)}>×</Close>
            </ModalHead>

            <InputRow>
              <Money
                readOnly
                value={rawAmt ? comma(rawAmt) : ''}
                placeholder="0"
              />
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
                <Key key={k} onClick={() => press(k === '←' ? 'back' : k)}>
                  {k}
                </Key>
              ))}
            </Pad>

            <Apply disabled={!rawAmt} onClick={saveAmt}>
              수정하기
            </Apply>
          </Modal>
        </Dim>
      )}

      {dateOpen && (
        <Dim>
          <DateModal>
            <ModalHead>
              <span>날짜 선택</span>
              <Close onClick={() => setDateOpen(false)}>×</Close>
            </ModalHead>

            <WheelWrap>
              <WheelCol ref={dateRef} onScroll={(e) => snap(e, setIdxDate)}>
                <WheelSpacer />
                {dateList.map((d, i) => (
                  <WheelItem key={i} $active={i === idxDate}>
                    {fmtDateKo(d)}
                  </WheelItem>
                ))}
                <WheelSpacer />
                <WheelSpacer />
              </WheelCol>

              <WheelCol
                ref={meriRef}
                onScroll={(e) => {
                  const i = Math.round(e.currentTarget.scrollTop / ROW_H);
                  setMeri(i === 2 ? '오후' : '오전');
                }}
              >
                <WheelSpacer />
                <WheelSpacer />
                <WheelItem $active={meri === '오전'}>오전</WheelItem>
                <WheelItem $active={meri === '오후'}>오후</WheelItem>
                <WheelSpacer />
                <WheelSpacer />
              </WheelCol>

              <WheelCol
                ref={hourRef}
                onScroll={(e) => snap(e, (i) => setHour12(i + 1))}
              >
                <WheelSpacer />
                {hours12.map((h) => (
                  <WheelItem key={h} $active={h === hour12}>
                    {h}
                  </WheelItem>
                ))}
                <WheelSpacer />
                <WheelSpacer />
              </WheelCol>

              <WheelCol ref={minRef} onScroll={(e) => snap(e, setMinute)}>
                <WheelSpacer />
                {minutes.map((m) => (
                  <WheelItem key={m} $active={m === minute}>
                    {two(m)}
                  </WheelItem>
                ))}
                <WheelSpacer />
                <WheelSpacer />
              </WheelCol>

              <WheelCenter />
            </WheelWrap>

            <Apply onClick={applyDate}>완료</Apply>
          </DateModal>
        </Dim>
      )}
    </Wrap>
  );
};

export default AddDay;
