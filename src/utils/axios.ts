import axiosLib, { AxiosInstance } from 'axios';

class CustomAxios {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosLib.create();
  }

  setAuthorization(token: string) {
    this.axiosInstance.defaults.headers.authorization = token;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const axios = new CustomAxios();
