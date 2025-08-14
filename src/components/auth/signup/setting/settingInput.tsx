import SettingInputIcon from './settingInputIcon';
import type { SettingInputProps } from '../../../../types/auth/signup/setting';
import { useSettingInput } from '../../../../hooks/auth/signup/useSettingInput';
import * as S from '../../../../styles/auth/signup/signup.style';

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
  inputDisabled = false,
  buttonDisabled,
  loading,
  loadingText,
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
  const showDelete = !!value && !inputDisabled;
  const showToggle =
    !!value && !hasButton && type === 'password' && !inputDisabled;

  return (
    <>
      <p className={S.Label}>
        {label && <label>{label}</label>}
        {required && <span className="text-[var(--color-M1)]">*</span>}
      </p>

      <div className={S.Wrapper}>
        <input
          type={inputType}
          {...register}
          disabled={inputDisabled}
          placeholder={placeholder}
          className={S.Input({
            hasError: !!error,
            hasButton: hasButton,
          })}
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
          <button
            className={S.Button({ hasError })}
            type="button"
            onClick={onClickButton}
            disabled={buttonDisabled || loading}
          >
            {loading ? (loadingText ?? '전송 중...') : buttonText}
          </button>
        )}
      </div>

      {error && <p className={S.Error}>{error.message}</p>}
    </>
  );
};

export default SettingInput;
