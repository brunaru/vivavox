import LoginActions from '../LoginActions';
import LoginForm from '../LoginForm';
import Splitter from '../Splitter';
import {
  AccountTitle,
  AccountMenuContainer
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