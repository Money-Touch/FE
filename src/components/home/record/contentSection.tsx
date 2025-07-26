import * as S from '../../../styles/home/record.style';
import reset from '../../../assets/images/home/record/x.png';
import Title from './title';

interface Props {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

const ContentSection = ({ value, error, onChange, onClear }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className={S.ContentSection}>
      <Title>항목명</Title>
      <div className={S.ContentInputWrapper(error)}>
        <input
          type="text"
          placeholder="지출 항목에 대해 작성해 주세요.(최대 20자)"
          value={value}
          onChange={handleChange}
          className={S.ContentInput}
        />
        {value.length > 0 && (
          <img
            src={reset}
            onClick={onClear}
            alt="clear"
            className={S.ClearIcon}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      {error && (
        <div className={S.ErrorMessage}>최대 20자까지만 입력할 수 있어요.</div>
      )}
    </div>
  );
};

export default ContentSection;
