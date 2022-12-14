import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UserMeResponse } from 'types/API';

// eslint-disable-next-line import/prefer-default-export
export const getLoggedInUser = (axiosInstance: AxiosInstance, options?: AxiosRequestConfig) => {
  return axiosInstance.get<UserMeResponse>('/api/user/me', options).then((res) => res.data);
};
