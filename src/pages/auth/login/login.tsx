import * as L from '../../../styles/auth/login/login.style';
import Logo from '../../../assets/images/auth/login/logo.png';
import LoginForm from '../../../components/auth/login/loginForm';
import ListMenu from '../../../components/auth/login/menu/list-menu';
import Kakao from '../../../components/auth/login/kakao/kakao';

const Login = () => {
  return (
    <L.LoginContainer className="pageContainer">
      <L.LogoContainer>
        <L.LogoImg src={Logo} alt="logo" />
        <L.LogoP>Touch</L.LogoP>
      </L.LogoContainer>

      <LoginForm />

      <ListMenu />

      <Kakao />
    </L.LoginContainer>
  );
};

export default Login;
