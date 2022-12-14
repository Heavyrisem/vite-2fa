import { atom } from 'recoil';
import { Roles } from 'types/API';

export interface User {
  id: number;
  name: string;
  email: string;
  roleGroup: {
    name: string;
    description: string;
    roles: Roles[];
  };
  twoFactorAuthenticated: boolean;
}

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export default userState;
