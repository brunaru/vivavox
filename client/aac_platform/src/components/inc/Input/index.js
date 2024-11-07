import {
  InputContainer,
  Label,
  InputField
} from './styled';

function Input({ type, label }) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField
        type={type}
      ></InputField>
    </InputContainer>
  );
}

export default Input;