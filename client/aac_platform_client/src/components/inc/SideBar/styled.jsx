import styled from "styled-components";

export const SideBarContainer = styled.aside`
  background-color: white;
  height: 100%;
  width: 15vw;
  filter: drop-shadow(4px 4px 4px grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 2;
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
  height: 7vh;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
`;