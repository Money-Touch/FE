import { useEffect } from 'react';
import { useValidateToken } from './useValidateToken';
import { useRefreshToken } from './useRefreshToken';
import { useNavigate } from 'react-router-dom';

const useAutoTokenRefresh = () => {
  const navigate = useNavigate();
  const { mutate: validateToken } = useValidateToken();
  const { mutate: refreshToken } = useRefreshToken();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');

    if (!accessToken || !refresh) return;

    validateToken(
      { token: accessToken },
      {
        onSuccess: (res) => {
          if (!res.result.valid) {
            refreshToken(
              { refreshToken: refresh },
              {
                onSuccess: (refreshRes) => {
                  const { accessToken, refreshToken } = refreshRes.result;
                  localStorage.setItem('accessToken', accessToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  console.log('토큰 갱신 성공');
                },
                onError: () => {
                  alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                  localStorage.clear();
                  navigate('/login');
                },
              },
            );
          }
        },
        onError: () => {
          console.warn('토큰 유효성 검사 실패');
        },
      },
    );
  }, []);
};

export default useAutoTokenRefresh;
