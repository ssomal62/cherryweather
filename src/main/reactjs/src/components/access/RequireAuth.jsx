import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsLoginAtom } from '../recoil/LoginAtom';

const RequireAuth = ({ children }) => {
  const isLogin = useRecoilValue(IsLoginAtom);
  
  if (!isLogin) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
