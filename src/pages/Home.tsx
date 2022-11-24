import React, { useCallback, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import Button from '@components/Button';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import authorizationState from '@recoil/atoms/authorization';
import userSelector from '@recoil/selectors/user';
import { axios } from '@utils/axios';

const Home: React.FC = () => {
  const [authorization, setAuthorization] = useRecoilState(authorizationState);
  const user = useRecoilValue(userSelector);

  const [message, setMessage] = useState<string>();

  const handleTestClick = useCallback(async () => {
    setMessage(undefined);
    const response = await axios.axiosInstance.get('/api/test').then((res) => res.data);
    setMessage(response);
  }, []);

  return (
    <DefaultLayout>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Home</div>
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

export default Home;
