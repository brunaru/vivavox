import Input from '../../Input';
import api from '../../../../services/api';
import {
  LoginFormContainer,
  EnterButton,
  ForgotPassword
} from './styled';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEnterButton(e) {
    e.preventDefault();

    try { 
      const loginData = {
        email: email,
        password: password
      }

      const response = await api.post('/user/login', loginData);

      if(response.status === 200) {
        setEmail("");
        setPassword("");

        const token = response.data.token;
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event("storage"));
      }
    } catch(error) {
      console.log("Error submiting login form: ", error);
    }
  }

  return(
    <LoginFormContainer>
      <Input type="email" label="E-mail" text={email} handleTextChange={(e) => setEmail(e.target.value)} width="50%" required autocomplete="username" />
      <Input type="password" label="Senha" text={password} handleTextChange={(e) => setPassword(e.target.value)} width="50%" required autocomplete="current-password" />
      <EnterButton onClick={handleEnterButton} $height="8%" $width="14%" $fontSize="1vw" >Entrar</EnterButton>
      <ForgotPassword>Esqueci a senha</ForgotPassword>
    </LoginFormContainer>
  );
}

export default LoginForm;