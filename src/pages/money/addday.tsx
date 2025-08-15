import { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import closeIcon from '../../assets/images/budget/Close.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import { useDailyMutation as createDailyConsumption } from '../../hooks/money/addday/useDailyMutation';

import {
  Wrap,
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
  DeleteIcon,
  DateBtn,
  Textarea,
  Save,
  Dim,
  Modal,
  ModalHead,
  Close,
  InputRow,
  InputIcon,
  Money,
  Pad,
  Key,
  ApplyContainer,
  Apply,
} from '../../styles/budget/addday.styles';

const CATEGORIES = ['배달/외식', '교통', '패션/쇼핑', '카페', '기타'] as const;

const comma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const two = (n: number) => String(n).padStart(2, '0');
const weekdayKo = ['일', '월', '화', '수', '목', '금', '토'] as const;
const fmtDateKo = (d: Date) =>
  `${d.getMonth() + 1}월${d.getDate()}일 ${weekdayKo[d.getDay()]}`;
const toLocalDt = (d: Date) =>
  `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())} ${two(
    d.getHours(),
  )}:${two(d.getMinutes())}`;

const localToISO = (s: string) => {
  const [d, t] = s.split(' ');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm] = t.split(':').map(Number);
  const dt = new Date(y, (m ?? 1) - 1, day ?? 1, hh ?? 0, mm ?? 0);
  return dt.toISOString();
};

type LayoutCtx = { setHideFooter: (b: boolean) => void };

const AddDay = () => {
  const nav = useNavigate();
  const layoutCtx = useOutletContext<LayoutCtx | null>();
  const hideFooter = layoutCtx?.setHideFooter;
  const [saving, setSaving] = useState(false);

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

  const dateInputRef = useRef<HTMLInputElement>(null);
  const ensureDateStr = () => {
    if (!dateStr) setDateStr(toLocalDt(new Date()));
  };
  const toNativeValue = (s: string) => (s ? s.replace(' ', 'T') : '');
  const onNativePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    if (!v) return;
    const d = new Date(v);
    setDateStr(toLocalDt(d));
  };
  const openDate = () => {
    ensureDateStr();
    const el = dateInputRef.current;
    if (!el) return;
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      el.focus();
      el.click();
    }
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

  const save = async () => {
    if (!valid || !dateStr) return;
    try {
      setSaving(true);
      await createDailyConsumption({
        categoryName: category,
        amount: Math.abs(amount),
        content: item.trim(),
        memo,
        consumeDate: localToISO(dateStr),
      });
      alert('저장되었습니다.');
      nav('/money', { state: { tab: '일일' } });
    } catch (e) {
      console.error(e);
      alert('저장에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrap>
      <Header title="일일" />

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
              <img src={pencilIcon} alt="edit" />
            </AmountBtn>
          </Row>
        </Section>

        <Divider />

        <Section style={{ margin: '1.8rem 0 6.6rem 0' }}>
          <Label>
            카테고리 선택<span>*</span>
          </Label>

          {/* ✅ 한 줄 + 가로 스크롤 */}
          <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
            <CatBox
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '8px',
                width: 'max-content',
              }}
            >
              {CATEGORIES.map((c) => (
                <CatBtn
                  key={c}
                  $on={c === category}
                  onClick={() => setCategory(c)}
                  style={{ flex: '0 0 auto', whiteSpace: 'nowrap' }}
                >
                  {c}
                </CatBtn>
              ))}
            </CatBox>
          </div>

          <Label>
            항목명<span>*</span>
          </Label>
          <div style={{ position: 'relative' }}>
            <Input
              value={item}
              maxLength={20}
              placeholder="지출 항목에 대해 작성해주세요.(최대 20자)"
              onChange={(e) => setItem(e.target.value)}
            />
            {item && (
              <DeleteIcon
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setItem('')}
              />
            )}
          </div>

          <Label>
            날짜<span>*</span>
          </Label>
          <div style={{ position: 'relative' }}>
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
            {dateStr && (
              <DeleteIcon
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setDateStr('')}
              />
            )}

            <input
              ref={dateInputRef}
              type="datetime-local"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                pointerEvents: 'none',
              }}
              value={toNativeValue(dateStr)}
              onChange={onNativePick}
            />
          </div>

          <Label>메모</Label>
          <Textarea
            value={memo}
            maxLength={1000}
            placeholder="1000자 이내로 작성"
            onChange={(e) => setMemo(e.target.value)}
          />

          <Save disabled={!valid || saving} onClick={save}>
            {saving ? '저장 중...' : '확인'}
          </Save>
        </Section>
      </Body>

      {padOpen && (
        <Dim>
          <Modal>
            <ModalHead>
              <Close
                src={closeIcon}
                alt="close"
                onClick={() => setPadOpen(false)}
              />
              <span>금액</span>
            </ModalHead>

            <InputRow>
              <Money
                readOnly
                value={rawAmt ? comma(rawAmt) : ''}
                hasValue={!!rawAmt}
              />
              <span>원</span>
              <InputIcon
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setRawAmt('')}
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
                <Key key={k} onClick={() => press(k === '←' ? 'back' : k)}>
                  {k}
                </Key>
              ))}
            </Pad>

            <ApplyContainer>
              <Apply disabled={!rawAmt} onClick={saveAmt}>
                수정하기
              </Apply>
            </ApplyContainer>
          </Modal>
        </Dim>
      )}
    </Wrap>
  );
};

export default AddDay;
