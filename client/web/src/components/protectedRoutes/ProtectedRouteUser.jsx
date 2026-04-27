import { useUser } from "../contexts/UserContext";
import { Navigate, useLocation } from 'react-router-dom';


function ProtectedRouteUser({ children }) {
  const {token} = useUser();
  const location = useLocation();

  if(!token) {
    return <Navigate to='/account' state={{ from: location }} replace />
  }

  return children;
}

export default ProtectedRouteUser;