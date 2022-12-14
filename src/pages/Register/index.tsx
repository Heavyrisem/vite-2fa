import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import BasicRegister from './BasicRegister';
import TwoFactorRegister from './TwoFactorRegister';

const Register: React.FC = () => {
  const [phase, setPhase] = useState(0);
  // const user = useRecoilValue(userSelector);

  // useEffect(() => {
  //   if (user && phase === 0) {
  //     setPhase(-1);
  //   }
  // }, [phase, user]);

  switch (phase) {
    case 0:
      return <BasicRegister onRegisterSuccess={() => setPhase(1)} />;
    case 1:
      return <TwoFactorRegister onRegisterSuccess={() => setPhase(2)} />;
    default:
      return <Navigate to="/" />;
  }
};

export default Register;
