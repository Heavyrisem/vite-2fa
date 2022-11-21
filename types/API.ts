export interface ErrorResponse {
  message: string | string[];
}

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  result: {
    twoFactorKey: string;
    twoFactorUrl: string;
  };
}
