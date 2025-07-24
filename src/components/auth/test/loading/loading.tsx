import { useEffect } from 'react';
import * as S from '../../../../styles/auth/signup/signup.style';
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
    <div className={`${S.AgreeContainer} !w-full !gap-[3.9rem]`}>
      <Spinner />
      <p className={`${S.ItemP} !text-[2rem]`}>소비 MBTI 측정 중...</p>
    </div>
  );
};

export default Loading;
