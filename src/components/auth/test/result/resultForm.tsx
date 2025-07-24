import type { ResultProps } from '../../../../types/auth/test/result';
import * as S from '../../../../styles/auth/signup/signup.style';
import * as T from '../../../../styles/auth/test/test.style';

interface ResultFormProps {
  data?: ResultProps;
}

const ResultForm = ({ data }: ResultFormProps) => {
  return (
    <div className={T.ResultFormContainer}>
      <p className={`${S.ItemP} !text-[var(--color-G3)] !text-[2rem]`}>
        {data?.name}
      </p>
      <p className={`${S.ItemP} !text-[2.6rem] !font-bold`}>{data?.email}</p>

      <div className={T.ResultImg} />
      <p className={`${S.ItemP} !text-[1.5rem] !leading-[2.3rem]`}>
        {data?.companyName}
        <br />
        {data?.email}
      </p>
    </div>
  );
};

export default ResultForm;
