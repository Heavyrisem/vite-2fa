import { selector } from 'recoil';

import authorizationState from '@recoil/atoms/authorization';

interface JwtPayload {
  twoFactorAuthenticated: boolean;
  exp: Date;
}

const jwtSelector = selector<JwtPayload | null>({
  key: 'jwtSelector',
  get: ({ get }) => {
    const { token } = get(authorizationState);
    if (!token) return null;

    const [_, payload] = token.split('.');
    const parsed = JSON.parse(window.atob(payload)) as JwtPayload;
    parsed.exp = new Date(Number(parsed.exp) * 1000);
    return parsed;
  },
});

export default jwtSelector;
