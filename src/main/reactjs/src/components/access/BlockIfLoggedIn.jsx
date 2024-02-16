import React from 'react';
import { useRecoilValue } from 'recoil';
import { IsLoginAtom } from '../../recoil/LoginAtom';
import { Navigate } from 'react-router-dom';

const BlockIfLoggedIn = ({children}) => {
    const isLogin = useRecoilValue(IsLoginAtom);
  
    if (isLogin) {
      // 로그인된 사용자를 메인 페이지로 리다이렉트
      return <Navigate to="/" replace />;
    }
  
    return children;
};

export default BlockIfLoggedIn;