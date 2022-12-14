import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import useEffectOnce from '@hooks/useEffectOnce';
import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import userSelector from '@recoil/selectors/user';

import BasicLogin from './BasicLogin';
import TwoFactorLogin from './TwoFactorLogin';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authorization = useRecoilValue(authorizationState);
  const user = useRecoilValue(userSelector);
  const [phase, setPhase] = useState(0);

  // useEffect(() => {
  //   console.log('login', user);
  // if (user) {
  //   if (user.twoFactorAuthenticated) setPhase(-1);
  //   else setPhase(1);
  // }
  // }, [user]);

  useEffectOnce(() => {
    if (user) {
      if (user.twoFactorAuthenticated) setPhase(-1);
      else setPhase(1);
    }
  });

  if (!user) {
    return <BasicLogin onLoginSuccess={() => setPhase(1)} />;
  }
  if (user && !user.twoFactorAuthenticated) {
    return <TwoFactorLogin onLoginSuccess={() => setPhase(2)} />;
  }

  return <Navigate to="/" />;
  // return <span onClick={() => navigate('/')}>success</span>;
};

export default Login;
