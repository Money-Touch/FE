import * as S from '../../../styles/home/record.style';
import star from '../../../assets/images/home/record/star.png';

interface Props {
  children: React.ReactNode;
  showStar?: boolean;
}

const Title = ({ children, showStar = true }: Props) => {
  return (
    <div className={S.Title}>
      {children}
      {showStar && <img className={S.StarImg} src={star} alt="star" />}
    </div>
  );
};

export default Title;
