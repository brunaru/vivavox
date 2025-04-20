import styled from 'styled-components';
import FeatureBar from '../inc/FeatureBar';
import SideBar from '../inc/SideBar';
import Board from '../inc/Board';
import { useCell } from '../contexts/CellContext';
import ConfigMenu from '../inc/ConfigMenu';
import { BoardContextProvider } from '../contexts/BoardContext';
import { PhraseContextProvider } from '../contexts/PhraseContext';
import { useState } from 'react';
import { useSidebar } from '../contexts/SideBarContext';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #EAEAEA;
  overflow: hidden;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
  flex-grow: 1;
`;

const BoardSpace = styled.div`
  flex-grow: 1;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '15vw' : '0'};
`;

function PageCurrentBoard() {
  const {configCell} = useCell();
  const { isSidebarOpen } = useSidebar();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PhraseContextProvider>
      <PageContainer> 
        <FeatureBar/>
        <MainSection>
          <SideBar/>
          <BoardSpace $isSidebarOpen={isSidebarOpen} >
            <Board/>
          </BoardSpace>
        </MainSection>
        {configCell && 
          <ConfigMenu/>
        }
      </PageContainer>
    </PhraseContextProvider>
  );
}

export default PageCurrentBoard;