import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRouteUser from './components/protectedRoutes/ProtectedRouteUser';
import PageCurrentBoard from './components/pages/PageCurrentBoard';
import PageProfiles from './components/pages/PageProfiles';
import PageSignUp from './components/pages/PageSignUp';
import PageLibrary from './components/pages/PageLibrary';

function Router() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/cur-board" replace />} />
      <Route path='/cur-board' element={
        <ProtectedRouteUser>
          <PageCurrentBoard/>
        </ProtectedRouteUser>
      } />
      <Route path='/library' element={
        <ProtectedRouteUser>
          <PageLibrary/>
        </ProtectedRouteUser>
      } />
      <Route path='/account' element={<PageProfiles/>} />
      <Route path='/account/signup' element={<PageSignUp/>} />
    </Routes>
  );
}

export default Router;