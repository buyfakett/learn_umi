import { request } from '@umijs/max';

interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
}

interface LoginResult {
  code: number;
  msg: string;
  data?: {
    token: string;
  };
}

export async function login(params: LoginParams) {
  return request<LoginResult>('/user/login', {
    method: 'POST',
    data: params,
  });
}
