// 백엔드 주소 설정
export const getApiBaseUrl = () => {
    const origin = window.location.origin;

    if (origin.includes("localhost")) {
        return "http://localhost:3000";
    }

    return "https://api.dont-touch.com";
};
