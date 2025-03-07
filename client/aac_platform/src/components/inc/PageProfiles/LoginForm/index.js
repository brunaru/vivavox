import Input from '../../Input';
import {
  LoginFormContainer,
  EnterButton,
  ForgotPassword
} from './styled';

function LoginForm() {
  return(
    <LoginFormContainer>
      <Input type="email" label="E-mail" width="50%" required />
      <Input type="password" label="Senha" width="50%" required />
      <EnterButton $height="8%" $width="14%" $fontSize="1vw" >Entrar</EnterButton>
      <ForgotPassword>Esqueci a senha</ForgotPassword>
    </LoginFormContainer>
  );
}

export default LoginForm;