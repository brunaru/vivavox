import styled from "styled-components";

const WriteBarContainer = styled.input`
  width: 38vw;
  height: 50%;
  background-color: ${({$color}) => ($color ? $color : "#EAEAEA")};
  border: none;
  border-radius: 8px;

  &:hover {
    cursor: text;
  }
`;

function WriteBar() {
  return (
    <WriteBarContainer>

    </WriteBarContainer>
  );
}

export default WriteBar;