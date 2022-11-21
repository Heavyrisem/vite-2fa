import React from 'react';

import tw from 'twin.macro';

interface DefaultLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, ...props }) => {
  return (
    <div css={[tw`w-full h-full`, tw`px-8 py-4`]} {...props}>
      {children}
    </div>
  );
};

export default DefaultLayout;
