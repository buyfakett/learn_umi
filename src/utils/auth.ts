import { authStore } from "@/stores/useAuthStore";

// 设置 token
export function setToken(token: string): void {
  const username: string = parseJwt(token)?.username ?? '';
  authStore.setState({ token, username });
}

// 获取 token 
export function getToken(): string | null {
  return authStore.getState().token;
}

// 获取 username
export function getUsername(): string | null {
  return authStore.getState().username;
}

// 删除 token
export function removeToken(): void {
  authStore.setState({ token: null, username: null });
}

interface JwtPayload {
  userid: string;
  username: string;
}

// 解jwt
export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));

    return {
      userid: decodedPayload.userid,
      username: decodedPayload.username,
    };
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
}
