import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import closeIcon from '../../assets/images/budget/Close.png';
import { useFixedCostMutation } from '../../hooks/money/fixedcost/useFixedCostMutation';

import * as A from '../../styles/budget/fixedcost.styles';

const CATEGORIES = ['배달/외식', '교통', '패션/쇼핑', '카페', '기타'] as const;
const fmtComma = (v: string | number) =>
  String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

type LayoutCtx = { setHideFooter: (b: boolean) => void };

const FixedCost = () => {
  const navigate = useNavigate();
  const outletCtx = useOutletContext<LayoutCtx | null>();
  const setHideFooter = outletCtx?.setHideFooter;
  const fixedCostMutation = useFixedCostMutation();
  const { isPending } = fixedCostMutation;

  useEffect(() => {
    setHideFooter?.(true);
    return () => setHideFooter?.(false);
  }, [setHideFooter]);

  const [category, setCategory] = useState<string>('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [raw, setRaw] = useState('');

  const valid = category && item.trim();

  const pressKey = (k: string) =>
    setRaw((prev) =>
      k === 'back' ? prev.slice(0, -1) : (prev + k).replace(/^0+(?=\d)/, ''),
    );
  const openModal = () => {
    setRaw(amount ? String(amount) : '');
    setModalOpen(true);
  };
  const applyValue = () => {
    const n = Number(raw);
    if (isNaN(n)) return;
    setAmount(n);
    setModalOpen(false);
    setRaw('');
  };

  const save = () => {
    if (!valid) return;

    fixedCostMutation.mutate(
      {
        amount: Math.abs(amount),
        categoryName: category,
        content: item.trim(),
        memo: memo || undefined,
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            alert('고정비가 등록되었습니다.');
            navigate('/money', { replace: true, state: { tab: '고정비' } });
          } else {
            alert(res.message || '고정비 등록에 실패했습니다.');
          }
        },
        onError: () => {
          alert('고정비 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className={A.Wrap}>
      <Header title="고정비" />

      <main className={A.Body}>
        <section className={A.Section}>
          <p className={A.Label2}>고정비</p>
          <div className={A.Row}>
            <button className={A.AmountBtn} onClick={openModal}>
              {fmtComma(amount)}원
              <img
                className="w-[2.4rem] h-[2.4rem]"
                src={pencilIcon}
                alt="금액 수정"
              />
            </button>
          </div>
        </section>

        <div className={A.Divider} />

        <section className={A.Section}>
          <p className={A.Label}>
            카테고리 선택
            <span className="ml-[0.2rem] text-[var(--color-M1)]">*</span>
          </p>

          <div className="overflow-x-auto pb-[0.4rem]">
            <div
              className={`${A.CatBox}`}
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '0.8rem',
                width: 'max-content',
              }}
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={A.CatBtn(c === category)}
                  onClick={() => setCategory(c)}
                  style={{ flex: '0 0 auto', whiteSpace: 'nowrap' }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className={A.Label}>
            항목명
            <span className="ml-[0.2rem] text-[var(--color-M1)]">*</span>
          </p>
          <div className="relative">
            <input
              className={A.Input}
              value={item}
              maxLength={20}
              placeholder="지출 항목에 대해 작성해주세요.(최대 20자)"
              onChange={(e) => setItem(e.target.value)}
            />
            {item && (
              <img
                className={A.DeleteIcon}
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setItem('')}
              />
            )}
          </div>

          <p className={A.Label}>메모</p>
          <textarea
            className={A.Textarea}
            placeholder="1000자 이내로 작성해 주세요."
            maxLength={1000}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <button
            className={A.Save(!valid || isPending)}
            disabled={!valid || isPending}
            onClick={save}
          >
            {isPending ? '등록 중...' : '확인'}
          </button>
        </section>
      </main>

      {modalOpen && (
        <div className={A.Dim}>
          <div className={A.Modal}>
            <div className={A.ModalHead}>
              <img
                className={A.Close}
                src={closeIcon}
                alt="close"
                onClick={() => setModalOpen(false)}
              />
              <span className="w-full text-[2rem] font-medium text-[var(--color-G1)] mb-[2rem]">
                고정비
              </span>
            </div>

            <div className={A.InputRow}>
              <input
                readOnly
                value={raw ? fmtComma(raw) : ''}
                className={A.Money(!!raw)}
              />
              <span className="absolute right-[4.5rem] text-[2.6rem] font-bold">
                원
              </span>
              <img
                className={A.InputIcon}
                src={circleCloseIcon}
                alt="delete"
                onClick={() => setRaw('')}
              />
            </div>

            <div className={A.Pad}>
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
                  key={k}
                  className={A.Key}
                  onClick={() => pressKey(k === '←' ? 'back' : k)}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className={A.ApplyContainer}>
              <button
                className={A.Apply(!raw)}
                disabled={!raw}
                onClick={applyValue}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedCost;
