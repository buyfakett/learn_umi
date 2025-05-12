import { request } from '@umijs/max';
import type { LoginParams, LoginResult } from './types';

/** 用户登录 */
export async function login(params: LoginParams) {
  return request<LoginResult>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}
