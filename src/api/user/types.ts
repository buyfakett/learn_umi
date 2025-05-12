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
