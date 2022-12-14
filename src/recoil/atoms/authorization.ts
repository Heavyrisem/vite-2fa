import { atom } from 'recoil';

import { BaseAtom } from '@recoil/atom.interface';
import { localStorageEffect } from '@recoil/utils';

const AUTHORIZATION_KEY = 'authorization';

export interface Authorization extends BaseAtom {
  token: string | null;
}

const authorizationState = atom<Authorization>({
  key: 'authorizationState',
  default: { token: null },
  effects: [localStorageEffect<Authorization>(AUTHORIZATION_KEY)],
});

export default authorizationState;
