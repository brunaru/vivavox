import styled from "styled-components";

export const SideBarContainer = styled.aside`
  background-color: white;
  height: 100%;
  width: 15vw;
  filter: drop-shadow(4px 4px 8px grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 80%;
  height: 6.2vh;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
`;