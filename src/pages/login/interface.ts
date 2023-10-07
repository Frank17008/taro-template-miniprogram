export interface LoginResData extends IToken {
  access_token: string;
  account: string;
  avatar: string;
  client_id: string;
  dept_id: string;
  detail: { type: string };
  expires_in: number;
  jti: string;
  license: string;
  nick_name: string;
  oauth_id: string;
  post_id: string;
  real_name: string;
  refresh_token: string;
  role_id: string;
  role_name: string;
  scope: string;
  tenant_id: string;
  token_type: string;
  user_id: string;
  user_name: string;
}

export interface IToken {
  error_description: string;
  error?: string;
  statusCode?: string | number;
}

export interface IForm {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
}
