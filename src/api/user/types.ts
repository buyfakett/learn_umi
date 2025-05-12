export interface CommonResp {
  code: number;
  msg: string;
}

export interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResp {
  code: number;
  msg: string;
  data?: {
    token: string;
  };
}

export interface UserListParams {
  page: number;
  page_size: number;
  username?: boolean;
}

export interface UserListResp {
  code: number;
  msg: string;
  total?: number;
  data?: [{
    user_id: number;
    username: string;
    email?: string;
  }];
}