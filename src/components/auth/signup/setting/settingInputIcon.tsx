import Delete from "../../../../assets/images/auth/signup/delete.png";
import Show from "../../../../assets/images/auth/login/show.png";
import NoShow from "../../../../assets/images/auth/login/noShow.png";
import * as S from "../../../../styles/auth/signup/signup";

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
            <S.DeleteIcon src={Delete} alt="delete" onClick={onDelete} hasButton={hasButton} />
        )}
        {showToggle && (
            <S.ToggleIcon
                src={showPassword ? Show : NoShow}
                alt="toggle"
                onClick={onToggle}
                hasDelete={hasDelete}
            />
        )}
    </>
);

export default SettingInputIcon;
