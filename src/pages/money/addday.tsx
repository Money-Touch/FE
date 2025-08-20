import { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import closeIcon from '../../assets/images/budget/Close.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import { useCategoryQuery } from '../../hooks/money/addday/useCategoryQuery';
import { useDailyMutation as createDailyConsumption } from '../../hooks/money/addday/useDailyMutation';

import * as A from '../../styles/budget/addday.styles';

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
type DateTimeInput = HTMLInputElement & { showPicker?: () => void };

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
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const { data } = useCategoryQuery();

  const categories = data?.result ?? [];

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
    const el = dateInputRef.current as DateTimeInput | null;
    if (!el) return;

    if (!isMobile && typeof el.showPicker === 'function') {
      el.showPicker();
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
    <>
      <A.AddDayTWGlobals />

      <A.Wrap>
        <Header title="일일" />

        <A.Body>
          <A.Section>
            <A.Label2>거래처</A.Label2>
            <A.Row>
              <A.AmountBtn
                onClick={() => {
                  setRawAmt(amount ? String(amount) : '');
                  setPadOpen(true);
                }}
              >
                {comma(amount)}원
                <img src={pencilIcon} alt="edit" />
              </A.AmountBtn>
            </A.Row>
          </A.Section>

          <A.Divider />

          <A.Section style={{ margin: '1.8rem 0 6.6rem 0' }}>
            <A.Label>
              카테고리 선택<span>*</span>
            </A.Label>

            <div style={{ overflowX: 'auto', paddingBottom: '0.4rem' }}>
              <A.CatBox
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  gap: '0.8rem',
                  width: 'max-content',
                }}
              >
                {categories.map((c) => (
                  <A.CatBtn
                    key={c.categoryName}
                    $on={c.categoryName === category}
                    onClick={() => setCategory(c.categoryName)}
                    style={{ flex: '0 0 auto', whiteSpace: 'nowrap' }}
                  >
                    {c.categoryName}
                  </A.CatBtn>
                ))}
              </A.CatBox>
            </div>

            <A.Label>
              항목명<span>*</span>
            </A.Label>
            <div style={{ position: 'relative' }}>
              <A.Input
                value={item}
                maxLength={20}
                placeholder="지출 항목에 대해 작성해주세요.(최대 20자)"
                onChange={(e) => setItem(e.target.value)}
              />
              {item && (
                <A.DeleteIcon
                  src={circleCloseIcon}
                  alt="delete"
                  onClick={() => setItem('')}
                />
              )}
            </div>

            <A.Label>
              날짜<span>*</span>
            </A.Label>
            <div style={{ position: 'relative' }}>
              <A.DateBtn $placeholder={!dateStr} onClick={openDate}>
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
              </A.DateBtn>
              {dateStr && (
                <A.DeleteIcon
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
                  pointerEvents: isMobile ? 'auto' : 'none',
                }}
                value={toNativeValue(dateStr)}
                onChange={onNativePick}
              />
            </div>

            <A.Label>메모</A.Label>
            <A.Textarea
              value={memo}
              maxLength={1000}
              placeholder="1000자 이내로 작성"
              onChange={(e) => setMemo(e.target.value)}
            />

            <A.Save disabled={!valid || saving} onClick={save}>
              {saving ? '저장 중...' : '확인'}
            </A.Save>
          </A.Section>
        </A.Body>

        {padOpen && (
          <A.Dim>
            <A.Modal>
              <A.ModalHead>
                <A.Close
                  src={closeIcon}
                  alt="close"
                  onClick={() => setPadOpen(false)}
                />
                <span>금액</span>
              </A.ModalHead>

              <A.InputRow>
                <A.Money
                  readOnly
                  value={rawAmt ? comma(rawAmt) : ''}
                  hasValue={!!rawAmt}
                />
                <span>원</span>
                <A.InputIcon
                  src={circleCloseIcon}
                  alt="delete"
                  onClick={() => setRawAmt('')}
                />
              </A.InputRow>

              <A.Pad>
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
                  <A.Key key={k} onClick={() => press(k === '←' ? 'back' : k)}>
                    {k}
                  </A.Key>
                ))}
              </A.Pad>

              <A.ApplyContainer>
                <A.Apply disabled={!rawAmt} onClick={saveAmt}>
                  수정하기
                </A.Apply>
              </A.ApplyContainer>
            </A.Modal>
          </A.Dim>
        )}
      </A.Wrap>
    </>
  );
};

export default AddDay;
