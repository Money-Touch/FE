import * as S from '../../../styles/home/record.style';

interface SubmitButtonProps {
  isActive: boolean;
  onClick: () => void;
  label?: string;
}

const SubmitButton = ({
  isActive,
  onClick,
  label = '완료',
}: SubmitButtonProps) => {
  return (
    <button
      className={S.SubmitButton(isActive)}
      disabled={!isActive}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
