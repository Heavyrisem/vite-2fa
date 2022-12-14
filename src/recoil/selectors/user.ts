import { DefaultValue, selector } from 'recoil';
import { Roles } from 'types/API';

import authorizationState from '@recoil/atoms/authorization';
import userState, { User } from '@recoil/atoms/user';

interface JwtPayload {
  twoFactorAuthenticated: boolean;
  exp: Date;
}

type UserSelector = User & JwtPayload;

// TODO: jwt payload 말고 /user/me 같은 api에서 정보를 불러오게
// 페이지 새로고침, 페이지에서 사용자 정보를 업데이트, http 403 response 인 경우 refetch

// 현재 상태에서는 재로그인 전까지 payload의 값이 바뀌지 않게 됨 (2fa 제외)

// TODO: 2fa 인증 여부를 서버에서 내려주기?
const userSelector = selector<User | null>({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user;
    // const { token } = get(authorizationState);
    // if (!token || !user) return null;

    // const [_, payload] = token.split('.');
    // const parsed = JSON.parse(window.atob(payload)) as JwtPayload;
    // parsed.exp = new Date(Number(parsed.exp) * 1000);

    // const result: UserSelector = { ...parsed, ...user };
    // return result;
  },
});

export default userSelector;
