import React from 'react';

import tw from 'twin.macro';

interface RootLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children, ...props }) => {
  return (
    <div
      css={[
        tw`flex flex-1 items-center justify-center`,
        tw`h-full`,
        tw`bg-zinc-900`,
        tw`text-white`,
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default RootLayout;
