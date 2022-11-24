import React from 'react';

import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';

import DefaultLayout from '@components/Layouts/DefaultLayout';
import authorizationState from '@recoil/atoms/authorization';
import userSelector from '@recoil/selectors/user';

const Home: React.FC = () => {
  const authorization = useRecoilValue(authorizationState);
  const user = useRecoilValue(userSelector);

  return (
    <DefaultLayout>
      <div css={[tw`text-4xl font-extrabold mb-8`]}>Home</div>
      <div css={[tw`text-sm text-zinc-200`]}>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </div>
      <div css={[tw`text-xs text-zinc-600`]}>{authorization.token}</div>
    </DefaultLayout>
  );
};

export default Home;
