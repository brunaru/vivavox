import SignUpForm from '../SignUpForm';
import {
  SignUpMenuContainer,
  AccountTitle
} from './styled';

function SignUpMenu() {
  return(
    <SignUpMenuContainer>
      <AccountTitle>Criar uma conta</AccountTitle>
      <SignUpForm/>
    </SignUpMenuContainer>
  );
}

export default SignUpMenu;