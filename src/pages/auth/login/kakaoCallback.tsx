import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKakaoLoginMutation } from '../../../hooks/auth/login/useKakaoLoginMutation';
import { getKakaoCode } from '../../../utils/auth/login/kakao/getKakaoCode';
import { getRedirectUri } from '../../../utils/auth/login/kakao/getRedirectUri';

const KakaoCallback = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useKakaoLoginMutation({
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      navigate('/home');
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
    },
  });

  useEffect(() => {
    const code = getKakaoCode();
    const redirectUri = getRedirectUri();

    if (code) {
      mutate({ code, redirectUri });
    } else {
      console.error('인가 코드 없음');
    }
  }, [mutate]);

  return (
    <div>
      {isPending ? '로그인 중...' : isError ? '로그인 실패' : '로그인 완료'}
    </div>
  );
};

export default KakaoCallback;
