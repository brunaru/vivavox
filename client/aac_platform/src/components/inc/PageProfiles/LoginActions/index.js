import {
  LoginActionsContainer,
  CreateAccountText,
  CreateAccountLink
} from './styled';

function LoginActions() {
  return(
    <LoginActionsContainer>
      <CreateAccountText>
        Ainda não tem uma conta?
      </CreateAccountText>
      <CreateAccountLink>Criar uma conta</CreateAccountLink>
    </LoginActionsContainer>
  );
}

export default LoginActions;