import { AxiosInstance } from 'axios';
import { ReIssueResponse } from 'types/API';

import { REFRESH_URL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const reIssueToken = (axiosInstance: AxiosInstance) => {
  return axiosInstance.post<ReIssueResponse>(REFRESH_URL).then((res) => res.data);
};
