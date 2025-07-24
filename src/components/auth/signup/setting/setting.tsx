import Header from '../../../header/header';
import SettingForm from './settingForm';
import * as S from '../../../../styles/auth/signup/signup.style';

interface SettingProps {
  onNext: () => void;
  onBack: () => void;
}

const Setting = ({ onNext, onBack }: SettingProps) => {
  return (
    <div className={S.AgreeContainer}>
      <Header onBack={onBack} />

      <p className={S.AgreeP}>
        이메일과 비밀번호를
        <br />
        설정해주세요.
      </p>

      <SettingForm onNext={onNext} />
    </div>
  );
};

export default Setting;
