import * as S from '../../../styles/home/record.style';
import reset from '../../../assets/images/home/record/x.png';

interface AmountInputProps {
  amount: number;
  onChange: (value: number) => void;
  onClear: () => void;
  isTouched: boolean;
}

const AmountInput = ({
  amount,
  onChange,
  onClear,
  isTouched,
}: AmountInputProps) => {
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
    <S.AmountInputWrapper>
      <S.AmountInput
        type="text"
        inputMode="numeric"
        value={!isTouched && amount === 0 ? '' : formatNumberWithComma(amount)}
        onChange={handleChange}
        placeholder="금액을 입력하세요."
      />
      <S.Won>원</S.Won>
      <S.ClearIcon src={reset} onClick={onClear} />
    </S.AmountInputWrapper>
  );
};

export default AmountInput;
