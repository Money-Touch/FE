import * as S from "../../../../styles/auth/signup/signup";
import colors from "../../../../styles/common/colors";
import Delete from "../../../../assets/images/auth/signup/delete.png";
import { useFormContext, useFormState } from "react-hook-form";
import { useProfileInput } from "../../../../hooks/auth/signup/useProfileInput";

const MAX_LENGTH = 10;

const ProfileInput = () => {
  const name = "nickname";
  const { register } = useFormContext();
  const { errors } = useFormState();
  const { value, handleDelete } = useProfileInput(name);

  const error = errors.nickname?.message as string | undefined;

  return (
        <S.ProfileInputContainer>
            <S.ProfileInputBox
                {...register(name)}
                type="text"
                placeholder="닉네임을 입력해주세요."
                hasError={!!error}
                isValid={!!value && !error}
            />
            {value && <S.BaseIcon style={{ right: "0"}} src={Delete} alt="delete" onClick={handleDelete} />}
            {error && <S.Error style={{ bottom: "-1.8rem"}}>{error}</S.Error>}
            
            <S.CountP isMax={!!error}>
                {Math.min(value.length, MAX_LENGTH)}
                <span style={{ color: colors.G5 }}>/{MAX_LENGTH}</span>
            </S.CountP>

     </S.ProfileInputContainer>
  );
};

export default ProfileInput;
