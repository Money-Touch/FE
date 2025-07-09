import colors from '../../../../styles/common/colors';
import type { ResultProps } from '../../../../types/auth/test/result';
import * as S from '../../../../styles/auth/signup/signup.style';
import * as T from '../../../../styles/auth/test/test.style';

interface ResultFormProps {
  data?: ResultProps;
}

const ResultForm = ({ data }: ResultFormProps) => {
  return (
    <>
      <S.ItemP
        style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          margin: '4.3rem 0 3.3rem 0',
        }}
      >
        {data?.name}님의 소비 MBTI는?
      </S.ItemP>

      <S.ItemP style={{ color: colors.G3, fontSize: '2rem' }}>
        {data?.name}
      </S.ItemP>
      <S.ItemP style={{ fontSize: '2.6rem', fontWeight: '700' }}>
        {data?.email}
      </S.ItemP>

      <T.ResultImg />
      <S.ItemP style={{ fontSize: '1.5rem', lineHeight: '2.3rem' }}>
        {data?.companyName}
        <br />
        {data?.email}
      </S.ItemP>
    </>
  );
};

export default ResultForm;
