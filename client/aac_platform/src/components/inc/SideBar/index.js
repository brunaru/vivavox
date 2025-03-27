import { useLocation } from "react-router-dom";
import { useCell } from "../../contexts/CellContext";
import { usePage } from "../../contexts/PageContext";
import SideBarButton from "../SideBarButton";
import {
  SideBarContainer,
  NavContainer,
  NavList,
  Item
} from "./styled";


function SideBar() {
  const {editing, setEditing} = useCell();

  const location = useLocation();
  console.log(location.pathname);

  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          <Item><SideBarButton text="Logo e Marca" height="125%" width="86%" fontSize="1vw" activeButton={location.pathname} /></Item>
          <Item><SideBarButton to="/cur-board" text="Prancha atual" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>
          <Item><SideBarButton text="Editar" height="100%" fontSize="1vw" editing={editing} setEditing={setEditing} activeButton={location.pathname} /></Item>
          <Item><SideBarButton to="/library" text="Biblioteca de Pranchas" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>
          <Item><SideBarButton to="/account" text="Contas e usuários" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>
          <Item><SideBarButton text="Configurações" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>
          <Item><SideBarButton text="Sobre a plataforma" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;