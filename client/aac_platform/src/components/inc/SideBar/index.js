import { useState } from "react";
import { useCell } from "../../contexts/CellContext";
import Button from "../Button";
import SideBarButton from "../SideBarButton";
import {
  SideBarContainer,
  NavContainer,
  NavList,
  Item
} from "./styled";


function SideBar() {
  const {editing, setEditing} = useCell();
  const [activeButton, setActiveButton] = useState("Prancha padrão");

  return (
    <SideBarContainer>
      <NavContainer>
        <NavList>
          <Item><SideBarButton text="Logo e Marca" height="125%" width="86%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Prancha padrão" height="100%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Coleção de palavras básicas" height="100%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Editar" height="100%" fontSize="1vw" editing={editing} setEditing={setEditing} setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Contas e usuários" height="100%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Configurações" height="100%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
          <Item><SideBarButton text="Sobre a plataforma" height="100%" fontSize="1vw" setActiveButton={setActiveButton} activeButton={activeButton} /></Item>
        </NavList>
      </NavContainer>
    </SideBarContainer>
  );
}

export default SideBar;