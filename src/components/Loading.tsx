import React from 'react';

import tw, { css } from 'twin.macro';

import AlyacImg from '@assets/alyac.png';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div css={[tw`relative`, tw`w-24 h-24`]} {...props}>
      <div
        css={[tw`absolute`, tw`w-full h-full`, tw`rounded-full bg-[#41cc0a27]`, tw`animate-ping`]}
      />
      <img
        src={AlyacImg}
        alt="loading"
        css={[
          tw`w-full h-full`,
          tw`animate-[loading-animation 2s cubic-bezier(0, 0, 0.2, 1) infinite]`,
          css`
            @keyframes loading-animation {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(0.8);
              }
              100% {
                transform: scale(1);
              }
            }
          `,
        ]}
      />
    </div>
  );
};

export default Loading;
