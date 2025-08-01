import * as L from '../../../styles/auth/login/login.style';
import Logo from '../../../assets/images/auth/login/logo.png';
import LoginForm from '../../../components/auth/login/loginForm';
import ListMenu from '../../../components/auth/login/menu/list-menu';
import Kakao from '../../../components/auth/login/kakao/kakao';

const Login = () => {
  return (
    <div className={`pageContainer ${L.LoginContainer}`}>
      <div className={L.LogoContainer}>
        <img className={L.LogoImg} src={Logo} alt="logo" />
        <p className={L.LogoP}>Touch</p>
      </div>

      <LoginForm />

      <ListMenu />

      <Kakao />
    </div>
  );
};

export default Login;
