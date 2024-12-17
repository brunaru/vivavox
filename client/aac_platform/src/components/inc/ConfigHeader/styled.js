import styled from "styled-components";


export const ConfigHeaderContainer = styled.div`
  width: 100%;
  height: 12%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 2px gray);
  // border-bottom: 2px solid gray;
`;

export const ConfigList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

export const ListItem = styled.li`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListButton = styled.button`
  border: none;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: ${({$fontSize}) => ($fontSize ? $fontSize : "1vw")};

  &:hover {
    cursor: pointer;
    background-color: ${({$activeButton}) => $activeButton ? '#003466' : '#EEEEEE' };
    color: ${({$activeButton}) => $activeButton ? 'white' : 'black' };
  }

  ${({$activeButton}) => 
    $activeButton && `
      background-color: #003466;
      color: white;
      filter: drop-shadow(0 1px 8px #525252);
    `
  }
`;