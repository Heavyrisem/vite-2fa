import { AtomEffect } from 'recoil';

import { BaseAtom } from './atom.interface';

// eslint-disable-next-line import/prefer-default-export
export const localStorageEffect =
  <T extends BaseAtom>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      const { saveStorage } = newValue;
      const isExist = Boolean(localStorage.getItem(key));
      if (saveStorage === false) return;
      if (saveStorage === undefined && isExist === false) return;

      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
