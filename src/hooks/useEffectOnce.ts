import { EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (f: EffectCallback) => {
  const prev = useRef(false);

  useEffect(() => {
    if (prev.current === false) {
      f();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEffectOnce;
