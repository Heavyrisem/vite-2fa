import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import userSelector from '@recoil/selectors/user';

interface PrivateRouterProps {
  children: React.ReactElement;
  role?: any; // TODO: 권한 추가
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children, role }) => {
  const user = useRecoilValue(userSelector);
  //   const navigator = useNavigate();

  // FIXME: 작동 안됨, 오류도 안남
  // if (user === null) {
  //   redirect('/login');
  // }

  if (user === null) return <Navigate to="/login" />;
  return children;
};

export default PrivateRouter;
