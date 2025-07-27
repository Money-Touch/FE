import * as S from '../../../styles/home/record.style';

interface MemoTextareaProps {
  value: string;
  isError: boolean;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const MemoInput = ({
  value,
  isError,
  isDisabled,
  onChange,
  onBlur,
}: MemoTextareaProps) => {
  return (
    <>
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="1000자 이내로 작성해 주세요."
        className={S.MemoTextarea(isError, isDisabled)}
        disabled={isDisabled}
      />
    </>
  );
};

export default MemoInput;
