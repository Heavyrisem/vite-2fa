import React, { useCallback, useState } from 'react';

import { AxiosError } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import Button from '@components/Button';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import useAxiosInstance from '@hooks/useAxiosInstance';
import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';

const Test: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const [authorization, setAuthorization] = useRecoilState(authorizationState);
  const user = useRecoilValue(userState);

  const [message, setMessage] = useState<string>();

  const handleTestClick = useCallback(async () => {
    setMessage(undefined);
    const response = await axiosInstance
      .post('/api/test')
      .then((res) => res.data)
      .catch((err) => JSON.stringify((err as AxiosError).response?.data));
    setMessage(response);
  }, [axiosInstance]);

  return (
    <DefaultLayout>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Test</div>
      <div css={[tw`flex flex-col gap-4`]}>
        <Button css={[tw`w-52`]} onClick={handleTestClick}>
          AuthenticationTest
        </Button>
        {message && <div>{message}</div>}
        <Button css={[tw`w-52`]} onClick={() => setAuthorization({ token: null })}>
          Logout
        </Button>
        <div>UserDetail</div>
        <div css={[tw`text-sm text-zinc-200`]}>
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </div>
        <div css={[tw`break-all text-xs text-zinc-600`]}>{authorization.token}</div>
      </div>
    </DefaultLayout>
  );
};

export default Test;
