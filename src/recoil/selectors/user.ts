import { importSPKI, jwtVerify, decodeJwt } from 'jose';
import { selector } from 'recoil';

import authorizationState from '@recoil/atoms/authorization';

const algorithm = 'RS256';
const spki = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu6CG70gr0eX/RkbLk/qm
rYWZqGS1iNbathnfPY5lxXdHkkJ64R0fpnkFi3A8HrpOVzeX2ub7DrTSeO+6Kuqy
3IgZy3nR5WeOqRTRKuvFh4Snaqn8IVReh/I2L+eYnTv65edj3JDsCytYFFeN1jLY
gFCcvBcGCg8BLVBq7mboL75u61eHfav6vBi4KBFaUIVTJ71afoHiPTEDwoyAXNEJ
o8g1o4gOHoT8uspO5/RvjuawuQhHX0guvZIxj1amE88Tb+Tl2pgCHimbH88WPmcX
6WAJuJIdE2NhuZ9qUpLQivnxPRTkF78G3X02zGZQ0LAV21Tdwo3g9DIynQuxr/gW
JQIDAQAB
-----END PUBLIC KEY-----
`;
const publicKey = await importSPKI(spki, algorithm);

interface User {
  email: string;
  name: string;
}

const userSelector = selector<User | null>({
  key: 'user',
  get: ({ get }) => {
    const { token } = get(authorizationState);
    if (!token) return null;

    try {
      jwtVerify(token, publicKey);
      return decodeJwt(token) as {} as User;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
});

export default userSelector;
