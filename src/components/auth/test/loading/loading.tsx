import { useEffect } from 'react';
import * as S from '../../../../styles/auth/signup/signup';
import Spinner from './spinner';

interface LoadingProps {
  onNext: () => void;
}

const Loading = ({ onNext }: LoadingProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <S.AgreeContainer style={{ gap: '0rem' }}>
      <Spinner />
      <S.ItemP style={{ fontSize: '2rem' }}>소비 MBTI 측정 중...</S.ItemP>
    </S.AgreeContainer>
  );
};

export default Loading;
