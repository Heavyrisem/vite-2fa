import React from 'react';

import tw from 'twin.macro';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      css={[tw`px-3 py-2`, tw`rounded-lg bg-zinc-700 hover:bg-zinc-600`, tw`transition-colors`]}
      {...props}
    />
  );
};

export default Button;
