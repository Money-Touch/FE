import { useEffect, useState } from 'react';
import * as T from '../../../../styles/auth/test/test.style';
import ResultData from '../../../../mocks/auth/test/resultData';

const Spinner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ResultData.length);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={T.SpinnerWrapper}>
      <img src={ResultData[index].image} className={T.SpinnerImg} alt="mbti" />
    </div>
  );
};

export default Spinner;
