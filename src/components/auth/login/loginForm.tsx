import * as L from '../../../styles/auth/login/login';
import { useState } from 'react';
import LoginInput from './loginInput';
import { useLoginMutation } from '../../../hooks/auth/login/useLoginMutation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLoginMutation();

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
        },
        onError: () => {
          alert('아이디와 비밀번호를 다시 확인해주세요.');
        },
      },
    );
  };

  return (
    <L.LoginFormContainer>
      <L.InputContainer>
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
          style={{ paddingRight: '4rem' }}
        />
      </L.InputContainer>

      <L.LoginButton onClick={handleLogin} disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </L.LoginButton>
    </L.LoginFormContainer>
  );
};

export default LoginForm;
