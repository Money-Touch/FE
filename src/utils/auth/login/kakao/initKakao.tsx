const KakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;

export const initKakao = () => {
  if (!window.Kakao?.isInitialized?.()) {
    window.Kakao.init(KakaoApiKey);
    // console.log('Kakao SDK 초기화 완료');
  }
};
