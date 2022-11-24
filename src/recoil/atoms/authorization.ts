import { atom } from 'recoil';

import { localStorageEffect } from '@recoil/utils';
import { axios } from '@utils/axios';

const AUTHORIZATION_KEY = 'authorization';

export interface Authorization {
  token: string | null;
}

const defaultValue: Authorization = JSON.parse(localStorage.getItem(AUTHORIZATION_KEY) ?? '');
const authorizationState = atom<Authorization>({
  key: 'authorization',
  default: {
    token: null,
  },
  effects: [
    ({ onSet }) => {
      if (defaultValue.token) axios.setAuthorization(defaultValue.token);
      onSet((newValue) => {
        if (newValue.token) {
          axios.setAuthorization(newValue.token);
        }
      });
    },
    localStorageEffect<Authorization>(AUTHORIZATION_KEY),
  ],
});

export default authorizationState;
