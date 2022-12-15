/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import uuid from 'react-uuid';

import tw, { css } from 'twin.macro';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  x: number;
  y: number;
  colors?: {
    from: string[];
    to: string[];
  };
}

const Loading: React.FC<LoadingProps> = ({ x, y, colors, ...props }) => {
  const [originColors, targetColors] = useMemo(() => {
    const from = colors?.from ?? ['white', '#42cc0a'];
    const to = colors?.to ?? ['#42cc0a', 'white'];
    return [from, to];
  }, [colors]);

  const iconStyle = useMemo(
    () => [
      tw`w-full h-full`,
      tw`bg-white rounded`,
      tw`animate-[load-animation 2s ease infinite]`,
      css`
        @keyframes load-animation {
          0% {
            ${tw`bg-[var(--load-color-from)]`}
            transform: scale(1);
          }
          50% {
            ${tw`bg-[var(--load-color-to)]`}
            transform: scale(0);
          }
          100% {
            ${tw`bg-[var(--load-color-from)]`}
            transform: scale(1);
          }
        }
      `,
    ],
    [],
  );

  const icons = useMemo(() => {
    const result = [];
    for (let i = 0; i < x; i += 1) {
      for (let j = i; j < y + i; j += 1) {
        result.push(
          <div
            key={uuid()}
            css={[iconStyle]}
            style={{
              '--load-color-from': originColors[j % originColors.length],
              '--load-color-to': targetColors[j % targetColors.length],
              animationDelay: `${0.1 * j}s`,
            }}
          />,
        );
      }
    }
    return result;
  }, [x, y, iconStyle, originColors, targetColors]);

  return (
    <div
      css={[tw`grid gap-1 -rotate-45`, tw`w-20 h-20`]}
      style={{ gridTemplateColumns: `repeat(${x}, 1fr)`, gridTemplateRows: `repeat(${y}, 1fr)` }}
      {...props}
    >
      {icons.map((elem) => elem)}
    </div>
  );
};

export default Loading;
