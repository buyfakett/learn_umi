import { request } from '@umijs/max';

interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
}

interface LoginResult {
  code: number;
  data: {
    token: string;
  };
  message: string;
}

export async function login(params: LoginParams) {
  return request<LoginResult>('/user/login', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    requestType: 'json',
    getResponse: true,
  });
} 