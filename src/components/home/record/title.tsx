import * as S from '../../../styles/home/record.style';
import star from '../../../assets/images/home/record/star.png';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  return (
    <div className={S.Title}>
      {children}
      <img className={S.StarImg} src={star} alt="star" />
    </div>
  );
};

export default Title;
