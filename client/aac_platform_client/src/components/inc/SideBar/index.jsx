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
import { useUser } from "../../contexts/UserContext";


function SideBar() {
  const {editing, setEditing} = useCell();
  const {token} = useUser();

  const location = useLocation();

  const alwaysVisibleItems = [
    <Item key="logo"><SideBarButton text="Logo e Marca" height="125%" width="86%" fontSize="1vw" activeButton={location.pathname} /></Item>,
    <Item key="account"><SideBarButton to="/account" text="Contas e usuários" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>,
    <Item key="about"><SideBarButton text="Sobre a plataforma" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>,
  ];

  const loggedInOnlyItems = [
    <Item key="cur-board"><SideBarButton to="/cur-board" text="Prancha atual" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>,
    <Item key="edit"><SideBarButton text="Editar" height="100%" fontSize="1vw" editing={editing} setEditing={setEditing} activeButton={location.pathname} /></Item>,
    <Item key="library"><SideBarButton to="/library" text="Biblioteca de Pranchas" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>,
    <Item key="settings"><SideBarButton text="Configurações" height="100%" fontSize="1vw" activeButton={location.pathname} /></Item>,
  ];

  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          {alwaysVisibleItems}
          {token && loggedInOnlyItems}
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;