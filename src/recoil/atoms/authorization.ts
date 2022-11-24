import { atom } from 'recoil';

import { localStorageEffect } from '@recoil/utils';

const AUTHORIZATION_KEY = 'authorization';

export interface Authorization {
  token: string | null;
}

const authorizationState = atom<Authorization>({
  key: 'authorization',
  default: {
    token: localStorage.getItem(AUTHORIZATION_KEY),
  },
  effects: [localStorageEffect<Authorization>(AUTHORIZATION_KEY)],
});

export default authorizationState;
