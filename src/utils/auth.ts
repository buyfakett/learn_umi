// 设置 token
export function setToken(token: string): void {
  const username: string = parseJwt(token)?.username ?? '';
  console.log(username)
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
}

// 获取 token
export function getToken(): string | null {
  return localStorage.getItem('token');
}

// 获取 username
export function getUsername(): string | null {
  return localStorage.getItem('username');
}

// 删除 token
export function removeToken(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

interface JwtPayload {
  userid: string;
  username: string;
}

// 解jwt
function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));

    const jwtPayload: JwtPayload = {
      userid: decodedPayload.userid,
      username: decodedPayload.username,
    };

    return jwtPayload;
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
}