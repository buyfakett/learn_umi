import { getToken, parseJwt } from '@/utils/auth';

export default () => {
  const token: string | null = getToken();
  let isAdmin: boolean = false;
  if (!token) {
    return isAdmin
  } else {
    const userid: string = parseJwt(token)?.userid ?? '';
    isAdmin = userid === '1';
  }

  return isAdmin
};
