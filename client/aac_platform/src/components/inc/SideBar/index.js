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
  const {page, setPage} = usePage();

  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          <Item><SideBarButton text="Logo e Marca" height="125%" width="86%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton to="/cur-board" text="Prancha atual" height="100%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton text="Editar" height="100%" fontSize="1vw" editing={editing} setEditing={setEditing} setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton text="Biblioteca de Pranchas" height="100%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton to="/account" text="Contas e usuários" height="100%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton text="Configurações" height="100%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
          <Item><SideBarButton text="Sobre a plataforma" height="100%" fontSize="1vw" setActiveButton={setPage} activeButton={page} /></Item>
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;