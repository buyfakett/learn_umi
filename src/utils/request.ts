import { extend } from 'umi-request';
import { getToken } from '@/utils/auth';

const token = getToken(); // 不声明类型，保持动态推导即可

const headers: Record<string, string> = {};
if (typeof token === 'string' && token) {
  headers['Authorization'] = token;
}

const requestAuth = extend({
  headers,
  credentials: 'include',
});

export default requestAuth;
