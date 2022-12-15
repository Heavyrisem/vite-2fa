import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useRecoilValue } from 'recoil';

import RootLayout from '@components/Layouts/RootLayout';
import Loading from '@components/Loading';
import useEffectOnce from '@hooks/useEffectOnce';
import useUser from '@hooks/useUser';
import jwtSelector from '@recoil/selectors/jwt';

import Router from './router';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { fetchUser } = useUser();
  const jwt = useRecoilValue(jwtSelector);

  useEffectOnce(() => {
    if (jwt) {
      fetchUser().then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000),
      );
    } else {
      setIsLoading(false);
    }
  });

  return (
    <RootLayout>
      {isLoading ? <Loading /> : <Router />}
      <ToastContainer theme="dark" position="bottom-right" />
    </RootLayout>
  );
};

export default App;
