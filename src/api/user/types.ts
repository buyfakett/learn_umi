export interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResult {
  code: number;
  msg: string;
  data?: {
    token: string;
  };
}

export interface UserListParams {
  page: bigint;
  page_size: bigint;
  username?: boolean;
}

export interface UserListResult {
  code: number;
  msg: string;
  total?: bigint;
  data?: [{
    user_id: bigint;
    username: string;
    email?: string;
  }];
}