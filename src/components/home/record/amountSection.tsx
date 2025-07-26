import * as S from '../../../styles/home/record.style';
import reset from '../../../assets/images/home/record/x.png';
import Title from './title';

interface Props {
  amount: number;
  isTouched: boolean;
  onChange: (value: number) => void;
  onClear: () => void;
}

const AmountSection = ({ amount, isTouched, onChange, onClear }: Props) => {
  const formatNumberWithComma = (value: number) =>
    value.toLocaleString('ko-KR');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange(0);
      return;
    }
    const unformatted = Number(raw.replace(/,/g, ''));
    if (!isNaN(unformatted)) {
      onChange(unformatted);
    }
  };

  return (
    <div className={S.AmountSection}>
      <Title>비용</Title>
      <div className={S.AmountInputWrapper}>
        <input
          type="text"
          inputMode="numeric"
          value={
            !isTouched && amount === 0 ? '' : formatNumberWithComma(amount)
          }
          onChange={handleChange}
          placeholder="금액을 입력하세요."
          className={S.AmountInput}
        />
        <span className={S.Won}>원</span>
        <img
          src={reset}
          alt="clear"
          onClick={onClear}
          className={S.ClearIcon}
          role="button"
          aria-label="Clear amount input"
        />
      </div>
    </div>
  );
};

export default AmountSection;
