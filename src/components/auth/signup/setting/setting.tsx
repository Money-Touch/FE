import Header from '../../../header/header';
import SettingForm from './settingForm';
import * as S from '../../../../styles/auth/signup/signup';

interface SettingProps {
  onNext: () => void;
  onBack: () => void;
}

const Setting = ({ onNext, onBack }: SettingProps) => {
  return (
    <S.AgreeContainer>
      <Header onBack={onBack} />

      <S.AgreeP>
        이메일과 비밀번호를
        <br />
        설정해주세요.
      </S.AgreeP>

      <SettingForm onNext={onNext} />
    </S.AgreeContainer>
  );
};

export default Setting;
