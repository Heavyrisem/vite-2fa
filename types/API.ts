import { User } from '@recoil/atoms/user';

export interface ErrorResponse {
  message: string | string[];
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  accessToken: string;
}

export interface ReIssueResponse {
  accessToken: string;
}

export interface UserMeResponse {
  result: User;
}

export enum Roles {
  TEST_ROLE = 'TestRole',
  MANAGE_USER = 'ManageUser',
}
