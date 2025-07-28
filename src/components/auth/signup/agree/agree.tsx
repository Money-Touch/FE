import Header from '../../../header/header';
import AgreeForm from './agreeForm';
import * as S from '../../../../styles/auth/signup/signup.style';
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

  const handleNext = () => {
    const agreeTerms = agreeList.map((item) => ({
      termsId: item.id,
      isAgree: item.checked,
    }));
    localStorage.setItem('agreeTerms', JSON.stringify(agreeTerms));
    onNext();
    localStorage.removeItem('agreeTerms');
  };

  return (
    <div className={S.AgreeContainer}>
      <Header />

      <p className={S.AgreeP}>
        서비스 이용 약관에
        <br />
        동의해주세요.
      </p>
      <AgreeForm agreeList={agreeList} setAgreeList={setAgreeList} />

      <div className={S.BottomContainer}>
        <button
          className={S.NextButton(agreeProced)}
          disabled={!agreeProced}
          onClick={handleNext}
        >
          다음
        </button>
        <p className={S.BottomP}>
          '선택' 항목에 동의하지 않아도 서비스 이용이 가능합니다.
          <br />
          개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며,
          <br />
          동의 거부시 회원제 서비스 이용이 제한됩니다.
        </p>
      </div>
    </div>
  );
};

export default Agree;
