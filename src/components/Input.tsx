import React, { useMemo } from 'react';

import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, invalid, className, ...props }, ref) => {
    const id = useMemo(() => uuid(), []);

    return (
      <span css={[tw`flex flex-col gap-1`]} className={className}>
        <label htmlFor={id} css={[tw`text-sm`]}>
          {label}
        </label>
        <div css={[tw`flex flex-col gap-1`]}>
          <input
            ref={ref}
            id={id}
            css={[
              tw`px-3 py-1`,
              tw`outline-none`,
              tw`rounded-lg bg-zinc-600 focus:bg-zinc-500 hover:bg-zinc-500`,
              tw`transition-colors`,
            ]}
            {...props}
          />
          {invalid && <span css={[tw`text-sm text-red-600`]}>{invalid}</span>}
        </div>
      </span>
    );
  },
);

export default Input;
