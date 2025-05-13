import { request } from '@umijs/max';
import { LoginParams, LoginResp, UserListParams, UserListResp, DeleteUserParams, DeleteUserResp } from './types';
import requestAuth from '@/utils/request';


/** 用户登录 */
export async function Login(params: LoginParams) {
  return request<LoginResp>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

/** 用户列表 */
export async function List(params: UserListParams) {
  return requestAuth<UserListResp>('/api/user/list', {
    method: 'GET',
    params: params,
  });
}

/** 用户列表 */
export async function Delete(params: DeleteUserParams) {
  return requestAuth<DeleteUserResp>(`/api/user/delete/${params.user_id}`, {
    method: 'DELETE',
  });
}
