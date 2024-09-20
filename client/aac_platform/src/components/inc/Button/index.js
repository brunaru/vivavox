import styled from "styled-components";

const ButtonContainer = styled.button`
  width: 5vw;
  height: 50%;
  background-color: ${({$color}) => ($color ? $color : "#EAEAEA")};
  border: none;
  border-radius: 8px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;

  &:hover {
    cursor: pointer;
  }
`;

function Button(props) {
  return (
    <ButtonContainer $color={props.color}>
      {props.text}
    </ButtonContainer>
  );
}

export default Button;