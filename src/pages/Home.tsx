import React, { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import Button from '@components/Button';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';
import useUser from '@hooks/useUser';
import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import jwtSelector from '@recoil/selectors/jwt';

const Home: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const authorization = useRecoilValue(authorizationState);
  const user = useRecoilValue(userState);
  const jwt = useRecoilValue(jwtSelector);
  const { logout } = useUser();

  const [message, setMessage] = useState<string>();

  const [expireIn, setExpireIn] = useState<number>(-1);

  const handleTestClick = useCallback(async () => {
    setMessage(undefined);
    const response = await axiosInstance
      .post('/api/test')
      .then((res) => res.data)
      .catch((err) => JSON.stringify((err as AxiosError).response?.data));
    setMessage(response);
  }, [axiosInstance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!jwt) return;
      const expire = jwt.exp.getTime() - Date.now();
      setExpireIn(expire / 1000);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [jwt]);

  return (
    <DefaultLayout>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Home</div>
      <div css={[tw`flex flex-col gap-4`]}>
        <Button css={[tw`w-52`]} onClick={handleTestClick}>
          AuthenticationTest
        </Button>
        {message && <div>{message}</div>}
        <Button css={[tw`w-52`]} onClick={logout}>
          Logout
        </Button>
        <div>UserDetail</div>
        <div css={[tw`text-sm text-zinc-200`]}>
          <pre>{JSON.stringify(user, null, 4)}</pre>
          <span>{expireIn > 0 ? `${expireIn} 초 후 토큰 만료` : '토큰 만료됨'}</span>
        </div>
        <div css={[tw`break-all text-xs text-zinc-600`]}>{authorization.token}</div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
