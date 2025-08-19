import * as S from '../../../styles/home/record.style';
import Title from './title';

interface Props {
  value: string;
  isError: boolean;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const MemoSection = ({
  value,
  isError,
  isDisabled,
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={S.MemoSection}>
      <Title showStar={isDisabled}>메모</Title>
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={
          !isDisabled ? '선택 사항입니다.' : '1000자 이내로 작성해 주세요.'
        }
        className={S.MemoTextarea(isError, isDisabled)}
      />
      {isError && (
        <div className={S.ErrorMessage}>
          최대 1000자까지만 입력할 수 있어요.
        </div>
      )}
    </div>
  );
};

export default MemoSection;
