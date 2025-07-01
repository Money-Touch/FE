export const getRedirectUri = () => {
  const origin = window.location.origin;

  if (origin.includes("localhost")) {
    return "http://localhost:5173/login/auth";
  }

  return "https://dont-touch.netlify.app/login/auth";
};
