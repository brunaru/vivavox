import styled from 'styled-components';
import SideBar from '../inc/SideBar';
import AccountIntro from '../inc/PageProfiles/AccountIntro';

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
`;

function PageProfiles() {
  return (
    <PageContainer>
      <MainSection>
        <SideBar/>
        <BoardSpace>
          <AccountIntro/>
        </BoardSpace>
      </MainSection>
    </PageContainer>
  );
}

export default PageProfiles;