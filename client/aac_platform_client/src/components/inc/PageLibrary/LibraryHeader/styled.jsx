import styled from "styled-components";

export const LibraryHeaderContainer = styled.section`
  background-color: #EAEAEA;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  filter: drop-shadow(2px 4px 4px grey);
  position: relative;
  z-index: 1;
`;

export const CurrentBoardContainer = styled.div`
  height: 100%;
  aspect-ratio: 5/3;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const SearchBoardContainer = styled.div`
  height: 100%;
  aspect-ratio: 5/1.5;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const SearchSubcontainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export const HeaderItemTitle = styled.label`
  margin: 0;
`;

export const Label = styled.label`

`;

export const SelectFilter = styled.select`

`;

export const CreateBoardContainer = styled.div`
  height: 100%;
  aspect-ratio: 5/3;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;