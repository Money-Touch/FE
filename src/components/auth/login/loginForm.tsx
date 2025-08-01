import * as L from '../../../styles/auth/login/login.style';
import { useState } from 'react';
import LoginInput from './loginInput';
import { useLoginMutation } from '../../../hooks/auth/login/useLoginMutation';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log('로그인 성공:', data);
          alert('로그인이 완료되었습니다.');
          localStorage.setItem('accessToken', data.result.accessToken);
          localStorage.setItem('refreshToken', data.result.refreshToken);
          navigate('/home');
        },
        onError: () => {
          alert('아이디와 비밀번호를 다시 확인해주세요.');
        },
      },
    );
  };

  return (
    <div className={L.LoginFormContainer}>
      <div className={L.InputContainer}>
        <LoginInput
          placeholder="이메일 주소"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          placeholder="비밀번호"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${L.InputBox} !pr-[4rem]`}
        />
      </div>

      <button
        className={L.LoginButton}
        onClick={handleLogin}
        disabled={isPending}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </button>
    </div>
  );
};

export default LoginForm;
