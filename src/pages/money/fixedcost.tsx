import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from '../../components/header/header';
import pencilIcon from '../../assets/images/budget/pencil.png';
import circleCloseIcon from '../../assets/images/budget/CircleClose.png';
import closeIcon from '../../assets/images/budget/Close.png';
import { useFixedCostMutation } from '../../hooks/money/fixedcost/useFixedCostMutation';

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
  Textarea,
  Save,
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
} from '../../styles/budget/fixedcost.styles';

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
    <Wrap>
      <Header title="고정비" />

      <Body>
        <Section>
          <Label2>고정비</Label2>
          <Row>
            <AmountBtn onClick={openModal}>
              {fmtComma(amount)}원
              <img src={pencilIcon} alt="금액 수정" />
            </AmountBtn>
          </Row>
        </Section>

        <Divider />

        <Section>
          <Label>
            카테고리 선택<span>*</span>
          </Label>

          {/* ✅ addday.tsx와 동일: 한 줄 + 가로 스크롤 */}
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

          <Label>메모</Label>
          <Textarea
            placeholder="1000자 이내로 작성해 주세요."
            maxLength={1000}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <Save disabled={!valid || isPending} onClick={save}>
            {isPending ? '등록 중...' : '확인'}
          </Save>
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
              <span>고정비</span>
            </ModalHead>

            <InputRow>
              <Money
                readOnly
                value={raw ? fmtComma(raw) : ''}
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

export default FixedCost;
