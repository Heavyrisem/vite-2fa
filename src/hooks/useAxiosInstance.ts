import { useEffect } from 'react';

import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';

import authorizationState from '@recoil/atoms/authorization';
import userState from '@recoil/atoms/user';
import { reIssueToken } from '@utils/api/auth';
import { REFRESH_URL } from '@utils/api/constants';
import { getLoggedInUser } from '@utils/api/user';

function useAxiosInstance() {
  const [authorization, setAuthorization] = useRecoilState(authorizationState);
  const setUser = useSetRecoilState(userState);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    if (authorization.token) {
      axiosInstance.defaults.headers.authorization = `Bearer ${authorization.token}`;
    }
  }, [authorization.token, axiosInstance.defaults.headers]);

  useEffect(() => {
    // axiosInstance.interceptors.request.use((config) => {
    //   const newConfig = config;
    //   console.log('INTERCEPTOR FOR', newConfig.url, authorization);
    //   if (newConfig.headers && authorization.token) {
    //     newConfig.headers.authorization = `Bearer ${authorization.token}`;
    //   }

    //   return newConfig;
    // });

    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const {
          config,
          response: { status, data },
        } = err;
        // if (config.url === REFRESH_URL && status === 401) {
        //   alert('로그인 정보가 만료되었습니다.');
        //   console.log('TokenExpired');
        //   setAuthorization({ token: null });
        //   return Promise.resolve(err);
        // }

        if (status === 403) {
          const { result: user } = await getLoggedInUser(axiosInstance);
          console.log('ReFetch LoggedInUser', user);
          setUser(user);
        }

        if (
          data?.message === 'TokenExpired' &&
          authorization.token &&
          config.url !== REFRESH_URL &&
          status === 401
        ) {
          const { accessToken } = await reIssueToken(axiosInstance).catch((error) => {
            alert('로그인 정보가 만료되었습니다.');
            console.log('TokenExpired');
            setAuthorization({ token: null });
            setUser(null);
            return Promise.resolve(error);
          });
          console.log('RE-ISSUE JWT Token');

          if (accessToken) {
            setAuthorization({ token: accessToken });
            return axiosInstance.request({
              ...config,
              headers: { authorization: `Bearer ${accessToken}` },
            });
          }
        }

        return Promise.reject(err);
      },
    );
    return () => {
      // axiosInstance.interceptors.request.clear();
      axiosInstance.interceptors.response.clear();
    };
  }, [
    authorization,
    authorization.token,
    axiosInstance,
    axiosInstance.interceptors.response,
    setAuthorization,
    setUser,
  ]);

  return axiosInstance;
}

export default useAxiosInstance;
