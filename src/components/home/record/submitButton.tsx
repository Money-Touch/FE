import * as S from '../../../styles/home/record.style';

interface SubmitButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SubmitButton = ({ isActive, onClick }: SubmitButtonProps) => {
  return (
    <button
      className={S.SubmitButton(isActive)}
      disabled={!isActive}
      onClick={onClick}
    >
      완료
    </button>
  );
};

export default SubmitButton;
