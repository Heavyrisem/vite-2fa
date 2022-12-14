import { atom } from 'recoil';
import { Role } from 'types/role';

export interface User {
  id: number;
  name: string;
  email: string;
  roleGroup: {
    name: string;
    description: string;
    roles: Role[];
  };
  twoFactorAuthenticated: boolean;
}

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export default userState;
