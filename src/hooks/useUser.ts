import { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { LoginResponse, RegisterResponse } from 'types/API';

import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import { getLoggedInUser } from '@utils/api/user';

import useAxiosInstance from './useAxiosInstance';

export interface BasicRegisterForm {
  email: string;
  name: string;
  password: string;
}
export interface BasicLoginForm {
  email: string;
  password: string;
}
export interface TwoFactorLoginForm {
  twoFactorCode: string;
}

const useUser = () => {
  const axiosInstance = useAxiosInstance();
  const setAuthorization = useSetRecoilState(authorizationState);
  const setUser = useSetRecoilState(userState);

  const fetchUser = useCallback(
    async (token?: string) => {
      const headers = token
        ? {
            authorization: `Bearer ${token}`,
          }
        : {};
      const { result: user } = await getLoggedInUser(axiosInstance, { headers }).catch(() => ({
        result: null,
      }));
      console.log('request fetch user', user);
      setUser(user);
    },
    [axiosInstance, setUser],
  );

  const login = useCallback(
    async (data: BasicLoginForm) => {
      const response = await axiosInstance
        .post<LoginResponse>('/api/auth/login', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  const logout = useCallback(() => {
    setAuthorization({ token: null });
    setUser(null);
  }, [setAuthorization, setUser]);

  const twoFactorLogin = useCallback(
    async (data: TwoFactorLoginForm) => {
      const response = await axiosInstance
        .post<LoginResponse>('/api/auth/login/2fa', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  const register = useCallback(
    async (data: BasicRegisterForm) => {
      const response = await axiosInstance
        .post<RegisterResponse>('/api/auth/register', data)
        .then((res) => res.data);

      if (response) {
        const { accessToken: token } = response;
        setAuthorization({ token });
        fetchUser(token);
      }
    },
    [axiosInstance, fetchUser, setAuthorization],
  );

  return { login, logout, twoFactorLogin, register, fetchUser };
};

export default useUser;
