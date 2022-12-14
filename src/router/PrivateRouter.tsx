import React from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { Roles } from 'types/role';

import userState from '@recoil/atoms/user';

interface PrivateRouterProps {
  children: React.ReactElement;
  roles?: Roles[];
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children, roles }) => {
  const user = useRecoilValue(userState);

  if (user === null || !user.twoFactorAuthenticated) return <Navigate to="/login" />;

  const userRoles = user.roleGroup.roles.map((role) => role.name);
  const userHasRoles = roles?.every((requireRole) => userRoles.includes(requireRole));
  if (roles && userHasRoles === false) return <Navigate to="/" />;

  return children;
};

export default PrivateRouter;
