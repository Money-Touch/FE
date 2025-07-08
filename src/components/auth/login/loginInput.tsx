import * as L from '../../../styles/auth/login/login';
import NoShow from '../../../assets/images/auth/login/noShow.png';
import Show from '../../../assets/images/auth/login/show.png';
import usePasswordToggle from '../../../hooks/auth/login/usePasswordToggle';
import type { LoginInputProps } from '../../../types/auth/login/login';

const LoginInput: React.FC<LoginInputProps> = ({ type, ...rest }) => {
  const isPasswordInput = type === 'password';
  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <L.InputWrapper>
      <L.InputBox
        {...rest}
        type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
      />
      {isPasswordInput && (
        <L.IconImg
          src={showPassword ? Show : NoShow}
          alt={showPassword ? 'hide' : 'show'}
          onClick={togglePassword}
        />
      )}
    </L.InputWrapper>
  );
};

export default LoginInput;
