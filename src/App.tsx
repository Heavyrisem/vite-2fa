import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';

import RootLayout from '@components/Layouts/RootLayout';
import useEffectOnce from '@hooks/useEffectOnce';
import useUser from '@hooks/useUser';
import jwtSelector from '@recoil/selectors/jwt';

import Router from './router';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { fetchUser } = useUser();
  const jwt = useRecoilValue(jwtSelector);

  useEffectOnce(() => {
    if (jwt) {
      fetchUser().then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  });

  // TODO: loading animation
  return <RootLayout>{isLoading ? <span>loading</span> : <Router />}</RootLayout>;
};

export default App;
