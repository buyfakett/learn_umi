import { request } from '@umijs/max';
import { LoginParams, LoginResult, UserListParams, UserListResult } from './types';
import requestAuth from '@/utils/request';


/** 用户登录 */
export async function login(params: LoginParams) {
  return request<LoginResult>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

/** 列表 */
export async function list(params: UserListParams) {
  return requestAuth<UserListResult>('/api/user/list', {
    method: 'GET',
    params: params,
  });
}
