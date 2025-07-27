import Delete from '../../../../assets/images/auth/signup/delete.png';
import Show from '../../../../assets/images/auth/login/show.png';
import NoShow from '../../../../assets/images/auth/login/noShow.png';
import * as S from '../../../../styles/auth/signup/signup.style';

interface Props {
  hasButton: boolean;
  hasDelete: boolean;
  showPassword: boolean;
  onDelete: () => void;
  onToggle: () => void;
  showToggle: boolean;
  showDelete: boolean;
}

const SettingInputIcon = ({
  hasButton,
  hasDelete,
  showPassword,
  onDelete,
  onToggle,
  showToggle,
  showDelete,
}: Props) => (
  <>
    {showDelete && (
      <img
        className={S.DeleteIcon({ hasButton })}
        src={Delete}
        alt="delete"
        onClick={onDelete}
      />
    )}
    {showToggle && (
      <img
        className={S.ToggleIcon({ hasDelete })}
        src={showPassword ? NoShow : Show}
        alt="toggle"
        onClick={onToggle}
      />
    )}
  </>
);

export default SettingInputIcon;
