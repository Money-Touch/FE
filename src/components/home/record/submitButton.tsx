import * as S from '../../../styles/home/record.style';

interface SubmitButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SubmitButton = ({ isActive, onClick }: SubmitButtonProps) => {
  return (
    <S.SubmitButton $active={isActive} disabled={!isActive} onClick={onClick}>
      완료
    </S.SubmitButton>
  );
};

export default SubmitButton;
