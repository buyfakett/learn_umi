export interface CommonResp {
  code: number;
  msg: string;
}

export interface LoginParams {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResp extends CommonResp {
  data?: {
    token: string;
  };
}

export interface UserListParams {
  page?: number;
  page_size?: number;
  username?: string;
}

export interface UserInfo {
  user_id: number;
  username: string;
  email?: string;
}

export interface UserListResp extends CommonResp {
  total?: number;
  data?: UserInfo[];
}

export interface DeleteUserParams {
  user_id: number;
}

export interface DeleteUserResp extends CommonResp {}
