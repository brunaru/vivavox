import LoginActions from '../LoginActions';
import LoginForm from '../LoginForm';
import Splitter from '../Splitter';
import {
  AccountMenuContainer,
  AccountTitle,
} from './styled';

function AccountIntro() {
  return(
    <AccountMenuContainer>
      <AccountTitle>Entrar com uma conta</AccountTitle>
      <LoginForm/>
      <Splitter/>
      <LoginActions/>
    </AccountMenuContainer>
  );
}

export default AccountIntro;