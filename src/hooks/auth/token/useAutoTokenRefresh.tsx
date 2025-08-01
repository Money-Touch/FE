import { useEffect } from 'react';
import { useValidateToken } from './useValidateToken';
import { useRefreshToken } from './useRefreshToken';
import { useNavigate } from 'react-router-dom';

const useAutoTokenRefresh = () => {
  const navigate = useNavigate();
  const { mutate: validateToken } = useValidateToken();
  const { mutate: refreshTokenMutate } = useRefreshToken();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) return;

    validateToken(
      { token: accessToken },
      {
        onSuccess: (res) => {
          console.log('validateToken 응답:', res);
          if (!res.result?.valid) {
            console.log('accessToken 만료됨 → 리프레시 시도');
            attemptRefresh();
          }
        },
        onError: (err) => {
          console.warn('validateToken 에러 → 리프레시 시도', err);
          attemptRefresh();
        },
      },
    );

    const attemptRefresh = () => {
      console.log('refreshToken으로 재발급 시도:', refreshToken);
      refreshTokenMutate(
        { refreshToken },
        {
          onSuccess: (res) => {
            console.log('refresh 응답:', res);
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = res.result;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            console.log('토큰 자동 갱신 성공');
          },
          onError: (err) => {
            console.error('refreshToken 실패:', err);
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.clear();
            navigate('/login');
          },
        },
      );
    };
  }, [navigate, validateToken, refreshTokenMutate]);
};

export default useAutoTokenRefresh;
