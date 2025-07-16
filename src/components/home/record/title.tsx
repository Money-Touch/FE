import * as S from '../../../styles/home/record.style';
import star from '../../../assets/images/home/record/star.png';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  return (
    <S.Title>
      {children}
      <S.StarImg src={star} />
    </S.Title>
  );
};

export default Title;
