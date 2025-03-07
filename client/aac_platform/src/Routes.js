import { Routes, Route } from 'react-router-dom';
import PageCurrentBoard from './components/pages/PageCurrentBoard';
import PageProfiles from './components/pages/PageProfiles';

function Router() {
  return(
    <Routes>
      <Route path='/' element={<PageCurrentBoard/>} />
      <Route path='/account' element={<PageProfiles/>} />
    </Routes>
  );
}

export default Router;