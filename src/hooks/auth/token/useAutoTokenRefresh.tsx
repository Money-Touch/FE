import { useEffect, useRef } from 'react';
import { useValidateToken } from './useValidateToken';
import { useRefreshToken } from './useRefreshToken';
import { useNavigate } from 'react-router-dom';

const REFRESH_BUFFER_MS = 60 * 1000;

const useAutoTokenRefresh = () => {
  const navigate = useNavigate();
  const { mutate: validateToken } = useValidateToken();
  const { mutate: refreshTokenMutate, isPending: isRefreshing } =
    useRefreshToken();

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshingRef = useRef(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) return;

    const scheduleRefresh = (expirationIso: string) => {
      const expireAt = new Date(expirationIso).getTime();
      const dueIn = expireAt - Date.now() - REFRESH_BUFFER_MS;
      const delay = Math.max(dueIn, 0);

      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = setTimeout(() => attemptRefresh(), delay);
    };

    const attemptRefresh = () => {
      if (refreshingRef.current || isRefreshing) return;
      refreshingRef.current = true;

      const currentRefresh = localStorage.getItem('refreshToken');
      if (!currentRefresh) {
        endSession();
        return;
      }

      refreshTokenMutate(
        { refreshToken: currentRefresh },
        {
          onSuccess: (res) => {
            const {
              accessToken: newAT,
              refreshToken: newRT,
              expiresIn,
            } = res.result;
            localStorage.setItem('accessToken', newAT);
            localStorage.setItem('refreshToken', newRT);

            const nextExpireAt = Date.now() + (expiresIn ?? 0) * 1000;
            const nextExpireIso = new Date(nextExpireAt).toISOString();
            scheduleRefresh(nextExpireIso);

            refreshingRef.current = false;
          },
          onError: () => {
            refreshingRef.current = false;
            endSession();
          },
        },
      );
    };

    const endSession = () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      localStorage.clear();
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      navigate('/login');
    };

    validateToken(
      { token: accessToken },
      {
        onSuccess: (res) => {
          const { valid, expiration } = res.result || {};
          if (!valid) {
            attemptRefresh();
            return;
          }
          if (expiration) {
            scheduleRefresh(expiration);
          }
        },
        onError: () => {
          attemptRefresh();
        },
      },
    );

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [navigate, validateToken, refreshTokenMutate, isRefreshing]);
};

export default useAutoTokenRefresh;
