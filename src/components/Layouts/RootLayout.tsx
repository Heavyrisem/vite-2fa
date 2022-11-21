import React from 'react';

import tw from 'twin.macro';

interface RootLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children, ...props }) => {
  return (
    <div css={[tw`w-full h-full bg-zinc-900`, tw`text-white`]} {...props}>
      {children}
    </div>
  );
};

export default RootLayout;
