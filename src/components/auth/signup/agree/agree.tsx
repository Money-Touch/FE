import Header from '../../../header/header';
import AgreeForm from './agreeForm';
import * as S from '../../../../styles/auth/signup/signup';
import { useState, useEffect } from 'react';
import type { AgreeItem } from '../../../../types/auth/signup/agree';
import { useAgreeForm } from '../../../../hooks/auth/signup/useAgreeForm';

interface AgreeProps {
  onNext: () => void;
  agreeList: AgreeItem[];
  setAgreeList: React.Dispatch<React.SetStateAction<AgreeItem[]>>;
}

const Agree = ({ onNext, agreeList, setAgreeList }: AgreeProps) => {
  const [agreeProced, setAgreeProced] = useState(false);

  const { requiredChecked } = useAgreeForm(agreeList, setAgreeList);

  useEffect(() => {
    setAgreeProced(requiredChecked);
  }, [requiredChecked]);

  return (
    <S.AgreeContainer>
      <Header />

      <S.AgreeP>
        서비스 이용 약관에
        <br />
        동의해주세요.
      </S.AgreeP>
      <AgreeForm agreeList={agreeList} setAgreeList={setAgreeList} />

      <S.BottomContainer>
        <S.NextButton
          active={agreeProced}
          disabled={!agreeProced}
          onClick={onNext}
        >
          다음
        </S.NextButton>
        <S.BottomP>
          '선택' 항목에 동의하지 않아도 서비스 이용이 가능합니다.
          <br />
          개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며,
          <br />
          동의 거부시 회원제 서비스 이용이 제한됩니다.
        </S.BottomP>
      </S.BottomContainer>
    </S.AgreeContainer>
  );
};

export default Agree;
