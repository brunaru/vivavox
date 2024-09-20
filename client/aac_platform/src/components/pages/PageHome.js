import styled from 'styled-components';
import FeatureBar from '../inc/FeatureBar';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background-color: #EAEAEA;
`

function PageHome() {
  return (
    <PageContainer>
      <FeatureBar/>
    </PageContainer>
  );
}

export default PageHome;