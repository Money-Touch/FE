import { ClipLoader } from 'react-spinners';
import * as T from '../../../../styles/auth/test/test.style';

const Spinner = () => {
  return (
    <div className={T.SpinnerWrapper}>
      <ClipLoader size={40} color="var(--color-mainColor1)" />
    </div>
  );
};

export default Spinner;
