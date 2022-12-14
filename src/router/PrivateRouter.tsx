import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { Roles } from 'types/API';

import userState from '@recoil/atoms/user';
import userSelector from '@recoil/selectors/user';

interface PrivateRouterProps {
  children: React.ReactElement;
  roles?: Roles[];
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children, roles }) => {
  const user = useRecoilValue(userSelector);

  useEffect(() => {
    console.log('privaterouter', user?.twoFactorAuthenticated);
  }, [user]);

  if (user === null || !user.twoFactorAuthenticated) return <Navigate to="/login" />;

  const userHasRoles = roles?.every((requireRole) => user.roleGroup.roles.includes(requireRole));
  if (roles && userHasRoles === false) return <Navigate to="/" />;

  return children;
};

export default PrivateRouter;
