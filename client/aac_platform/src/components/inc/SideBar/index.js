import Button from "../Button";
import {
  SideBarContainer,
  NavContainer,
  NavList,
  Item
} from "./styled";


function SideBar({ editing, setEditing }) {
  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          <Item><Button text="Logo e Marca" height="125%" width="86%" fontSize="1vw" /></Item>
          <Item><Button text="Prancha padrão" height="100%" fontSize="1vw" /></Item>
          <Item><Button text="Coleção de palavras básicas" height="100%" fontSize="1vw" /></Item>
          <Item><Button text="Editar" height="100%" fontSize="1vw" editing={editing} setEditing={setEditing}/></Item>
          <Item><Button text="Contas e usuários" height="100%" fontSize="1vw" /></Item>
          <Item><Button text="Configurações" height="100%" fontSize="1vw" /></Item>
          <Item><Button text="Sobre a plataforma" height="100%" fontSize="1vw" /></Item>
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;