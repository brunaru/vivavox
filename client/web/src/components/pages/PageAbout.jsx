import styled from 'styled-components';
import SideBar from '../inc/SideBar';
import About from '../inc/PageAbout';
import { useSidebar } from '../contexts/SideBarContext';

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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ $isSidebarOpen }) => $isSidebarOpen ? '15vw' : '0'};
`;

function PageAbout() {
  const {isSidebarOpen} = useSidebar();

  return (
    <PageContainer>
      <MainSection>
        <SideBar/>
        <BoardSpace $isSidebarOpen={isSidebarOpen}>
          <About/>
        </BoardSpace>
      </MainSection>
    </PageContainer>
  );
}

export default PageAbout;