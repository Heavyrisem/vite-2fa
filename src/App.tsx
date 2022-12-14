import React, { useEffect, useState } from 'react';

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

  // TODO: Login 성공한 경우, Login 컴포넌트에서 refetch 시켜야 함
  // Recoil Selector 로 분리?
  //   const fetchLoggenInUser = useCallback(async () => {
  //     setIsLoading(true);
  //     const { result: user } = await getLoggedInUser(axiosInstance).catch(() => ({ result: null }));
  //     setUser(user);
  //     console.log('fetchLoggenInUser', user);
  //     setIsLoading(false);
  //   }, [axiosInstance, setUser]);

  useEffectOnce(() => {
    if (jwt) {
      fetchUser().then(() => setIsLoading(false));
      //   fetchLoggenInUser();
    } else {
      setIsLoading(false);
    }
  });

  //   useEffect(() => {
  //     console.log('user updated', user);
  //     setUser(user);
  //   }, [setUser, user]);

  return <RootLayout>{isLoading ? <span>loading</span> : <Router />}</RootLayout>;
};

export default App;
