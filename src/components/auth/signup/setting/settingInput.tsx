import colors from '../../../../styles/common/colors';
import SettingInputIcon from './settingInputIcon';
import type { SettingInputProps } from '../../../../types/auth/signup/setting';
import { useSettingInput } from '../../../../hooks/auth/signup/useSettingInput';
import * as S from '../../../../styles/auth/signup/signup';

const SettingInput = ({
  name,
  label,
  required = false,
  register,
  error,
  type,
  buttonText,
  onClickButton,
  placeholder,
}: SettingInputProps) => {
  const {
    value,
    isEmpty,
    showPassword,
    togglePassword,
    handleDelete,
    inputType,
  } = useSettingInput(name, type);

  const hasError = !!error || isEmpty;
  const hasButton = !!buttonText;
  const showDelete = !!value;
  const showToggle = !hasButton && type === 'password';

  return (
    <>
      <S.Label>
        {label}
        {required && <span style={{ color: colors.M1 }}>*</span>}
      </S.Label>

      <S.Wrapper>
        <S.Input
          type={inputType}
          {...register}
          placeholder={placeholder}
          hasError={!!error}
          hasButton={hasButton}
        />

        <SettingInputIcon
          hasButton={hasButton}
          hasDelete={showDelete}
          showPassword={showPassword}
          onDelete={handleDelete}
          onToggle={togglePassword}
          showDelete={showDelete}
          showToggle={showToggle}
        />

        {hasButton && (
          <S.Button type="button" onClick={onClickButton} hasError={hasError}>
            {buttonText}
          </S.Button>
        )}
      </S.Wrapper>

      {error && <S.Error>{error.message}</S.Error>}
    </>
  );
};

export default SettingInput;
