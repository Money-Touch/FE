import { ClipLoader } from 'react-spinners';
import * as T from '../../../../styles/auth/test/test';
import colors from '../../../../styles/common/colors';

const Spinner = () => {
  return (
    <T.SpinnerWrapper>
      <ClipLoader size={40} color={colors.mainColor1} />
    </T.SpinnerWrapper>
  );
};

export default Spinner;
