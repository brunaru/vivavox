import styled from 'styled-components';
import FeatureBar from '../inc/FeatureBar';
import SideBar from '../inc/SideBar';
import Board from '../inc/Board';
import { useCell } from '../contexts/CellContext';
import ConfigMenu from '../inc/ConfigMenu';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #EAEAEA;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const BoardSpace = styled.div`
  width: 85vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PageHome() {
  const {configCell} = useCell();

  return (
    <PageContainer>
      <FeatureBar/>
      <MainSection>
        <SideBar/>
        <BoardSpace>
          <Board/>
        </BoardSpace>
      </MainSection>
      {configCell && 
        <ConfigMenu/>
      }
    </PageContainer>
  );
}

export default PageHome;