import * as L from '../../../styles/auth/login/login.style';
import NoShow from '../../../assets/images/auth/login/noShow.png';
import Show from '../../../assets/images/auth/login/show.png';
import usePasswordToggle from '../../../hooks/auth/login/usePasswordToggle';
import type { LoginInputProps } from '../../../types/auth/login/login';
import { useState } from 'react';

const LoginInput: React.FC<LoginInputProps> = ({ type, ...rest }) => {
  const isPasswordInput = type === 'password';
  const { showPassword, togglePassword } = usePasswordToggle();

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    rest.onChange?.(e);
  };

  return (
    <div className={L.InputWrapper}>
      <input
        className={L.InputBox}
        {...rest}
        onChange={handleChange}
        type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
      />
      {isPasswordInput && !!inputValue && (
        <img
          className={L.IconImg}
          src={showPassword ? NoShow : Show}
          alt={showPassword ? 'hide' : 'show'}
          onClick={togglePassword}
        />
      )}
    </div>
  );
};

export default LoginInput;
