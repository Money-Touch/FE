import * as S from '../../../styles/home/record.style';
import reset from '../../../assets/images/home/record/x.png';

interface ContentInputProps {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

const ContentInput = ({
  value,
  error,
  onChange,
  onClear,
}: ContentInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <S.ContentInputWrapper $error={error}>
      <S.ContentInput
        type="text"
        placeholder="지출 항목에 대해 작성해 주세요.(최대 20자)"
        value={value}
        onChange={handleChange}
      />
      {value.length > 0 && <S.ClearIcon src={reset} onClick={onClear} />}
    </S.ContentInputWrapper>
  );
};

export default ContentInput;
