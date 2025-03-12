import {
  InputContainer,
  Label,
  InputField
} from './styled';

function Input({ text, handleTextChange, type, label, width, autocomplete }) {
  return (
    <InputContainer $width={width}>
      <Label>{label}</Label>
      <InputField
        value={text}
        onChange={handleTextChange}
        type={type}
        autoComplete={autocomplete}
      ></InputField>
    </InputContainer>
  );
}

export default Input;