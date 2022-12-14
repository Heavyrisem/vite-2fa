import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import BasicRegister from './BasicRegister';
import TwoFactorRegister from './TwoFactorRegister';

const Register: React.FC = () => {
  const [phase, setPhase] = useState(0);

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
