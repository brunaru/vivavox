import styled from "styled-components";

export const SideBarContainer = styled.aside`
  background-color: white;
  filter: drop-shadow(4px 4px 4px grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;             
  width: 15vw;                
  overflow-x: hidden;      
  overflow-y: auto;            
  position: fixed;              
  top: 0;                      
  left: 0;                      
  z-index: 3;  
  
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  padding-top: 50px;
`;

export const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.4vh;
`;

export const Item = styled.li`
  width: 100%; 
  height: 6vh;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-tap-highlight-color: transparent;

  & > * {
    width: 100%;
    height: 100%;
  }

`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 80px;
  z-index: 1001;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  left: ${({ $isOpen }) => $isOpen ? `calc(15vw - 20px)` : '15px'}; 

  &:hover {
    background-color: #e0e0e0;
  }
`;