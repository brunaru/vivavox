// client/aac_platform_client/src/components/pages/PageCurrentBoard.jsx
import styled from 'styled-components';
import FeatureBar from '../inc/FeatureBar';
import SideBar from '../inc/SideBar';
import Board from '../inc/Board';
import { useCell } from '../contexts/CellContext';
import ConfigMenu from '../inc/ConfigMenu';
import { PhraseContextProvider } from '../contexts/PhraseContext';
import { useSidebar } from '../contexts/SideBarContext';
import { useBoard } from '../contexts/BoardContext';
import { ScanContextProvider } from '../contexts/ScanContext';
import ScanControls from '../inc/ScanControls';
import React, { useRef } from 'react';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  overflow: hidden; 
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '15vw' : '0'};
  padding-top: 20px;
  width: 100%;
  overflow-y: auto; 
`;

const BoardSpace = styled.div`
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  flex-direction: column;
`;

function PageCurrentBoard() {
  const {configCell, editing} = useCell();
  const {board} = useBoard();
  const {isSidebarOpen} = useSidebar();
  const boardRef = useRef();

  const onSelect = (row, col) => {
    if (boardRef.current) {
        boardRef.current.selectCell(row, col);
    }
  };

  return (
    <PhraseContextProvider>
      <PageContainer> 
        <FeatureBar/>
        <MainSection>
          <SideBar/>
          <ContentContainer $isSidebarOpen={isSidebarOpen}>
            {board ? ( 
              <ScanContextProvider
                rows={board.dimensions[0]}
                cols={board.dimensions[1]}
                onSelect={onSelect}
              >
                <BoardSpace>
                  <ScanControls />
                  <Board ref={boardRef} />
                </BoardSpace>
              </ScanContextProvider>
            ) : (
              <h2>Carregando quadro...</h2>
            )}
          </ContentContainer>
        </MainSection>
        {(configCell || editing) && 
          <ConfigMenu/>
        }
      </PageContainer>
    </PhraseContextProvider>
  );
}

export default PageCurrentBoard;

