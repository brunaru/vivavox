import Button from "../Button";
import {
  SideBarContainer,
  NavContainer,
  NavList,
  Item
} from "./styled";


function SideBar() {
  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
          <Item><Button text="Teste" height="100%"/></Item>
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;