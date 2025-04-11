import { useState } from 'react';
import Input from '../../Input';
import {
  SignUpFormContainer,
  EnterButton
} from './styled';
import api from '../../../../services/api';

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  async function handleEnterButton(e) {
    e.preventDefault();

    if(password !== confirmedPassword) {
      // Lógica de feedback de erro...
      console.log("Passwords don't match");
      return;
    }

    try {
      const newUser = {
        name: name,
        email: email,
        password: password,
        confirmedPassword: confirmedPassword
      }

      const response = await api.post("/user/post", newUser);

      if(response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmedPassword("");
        console.log(response.data.message);
      }
    } catch(error) {
      console.log("Error sending the form:", error);
    }
  }

  return(
    <SignUpFormContainer>
      <Input 
        id="name"
        type="text" 
        label="Nome" 
        text={name}
        handleTextChange={(e) => setName(e.target.value)}
        width="50%" 
        required 
        autocomplete="name"
      />
      <Input 
        id="email"
        type="email" 
        label="Endereço de e-mail" 
        text={email}
        handleTextChange={(e) => setEmail(e.target.value)}
        width="50%" 
        required 
        autocomplete="username"
      />
      <Input 
        id="password"
        type="password" 
        label="Senha" 
        text={password}
        handleTextChange={(e) => setPassword(e.target.value)}
        width="50%" 
        required 
        autocomplete="new-password"
      />
      <Input 
        id="confirmedPassword"
        type="password" 
        label="Confirmar Senha" 
        text={confirmedPassword}
        handleTextChange={(e) => setConfirmedPassword(e.target.value)}
        width="50%" 
        required 
        autocomplete="new-password"
      />
      <EnterButton onClick={handleEnterButton} $height="50px" $width="100px" $fontSize="1vw" >Criar</EnterButton>
    </SignUpFormContainer>
  );
}

export default SignUpForm;