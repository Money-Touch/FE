import * as L from '../../../styles/auth/login/login.style';
import { useState, useEffect } from 'react';
import LoginInput from './loginInput';
import { useLoginMutation } from '../../../hooks/auth/login/useLoginMutation';
import { useKakaoLoginMutation } from '../../../hooks/auth/login/useKakaoLoginMutation';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRedirectUri } from '../../../utils/auth/login/kakao/getRedirectUri';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: loginMutate, isPending } = useLoginMutation();
  const { mutate: kakaoLoginMutate } = useKakaoLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    console.log('현재 URL에서 추출한 인가 코드:', code);

    // 카카오 로그인
    if (code) {
      kakaoLoginMutate(
        {
          code,
          redirectUrl: getRedirectUri(),
        },
        {
          onSuccess: (data) => {
            console.log('카카오 로그인 성공:', data);
            localStorage.setItem('accessToken', data.result.accessToken);
            localStorage.setItem('refreshToken', data.result.refreshToken);
            localStorage.setItem('nickname', data.result.nickname);

            if (data.result.newUser) {
              navigate('/test');
            } else {
              navigate('/home');
            }
          },
          onError: (err) => {
            console.error('카카오 로그인 실패:', err);
            alert('카카오 로그인에 실패했습니다.');
            navigate('/login');
          },
        },
      );
    }
  }, [location.search, kakaoLoginMutate, navigate]);

  // 일반 로그인
  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    loginMutate(
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
