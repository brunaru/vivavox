import styled from 'styled-components';
import FeatureBar from '../inc/FeatureBar';
import SideBar from '../inc/SideBar';

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

function PageHome() {
  return (
    <PageContainer>
      <FeatureBar/>
      <MainSection>
        <SideBar/>
      </MainSection>
    </PageContainer>
  );
}

export default PageHome;