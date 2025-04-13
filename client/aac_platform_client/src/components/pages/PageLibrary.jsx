import styled from "styled-components";
import SideBar from "../inc/SideBar";
import BoardLibrary from "../inc/PageLibrary/BoardLibrary";
import { useEffect } from "react";
import api from "../../services/api";
import { useBoard } from "../contexts/BoardContext";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #EAEAEA;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const BoardSpace = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EAEAEA;
`;

function PageLibrary() {
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const {board, setBoard} = useBoard();

  async function handleFetch() {
    try {
      const response = await api.get("/board/get/Padrão 1");
      setBoard({
        _id: response.data._id,
        name: response.data.name,
        numCells: response.data.numCells,
        cells: response.data.cells
      })
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(baseURL) {
      console.log("Reaload de página");
      handleFetch();
    } else {
      console.warn("API_BASE_URL not defined. Verify .env");
    }
  }, []);

  return (
    <PageContainer> 
      <MainSection>
        <SideBar/>
        <BoardSpace>
          <BoardLibrary/>
        </BoardSpace>
      </MainSection>
    </PageContainer>
  );
}

export default PageLibrary;