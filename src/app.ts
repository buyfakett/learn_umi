import { RequestConfig, history } from '@umijs/max';
import { getToken } from '@/utils/auth';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  const token = getToken();
  const { pathname } = history.location;
  
  // 在初始化时就检查token
  if (!token && pathname !== '/login') {
    history.replace('/login');
  }
  
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

// 路由监听
history.listen(({ location }) => {
  const { pathname } = location;
  // 未登录且不在登录页时跳转
  if (!getToken() && pathname !== '/login') {
    history.replace('/login');
  }
});

// 请求拦截器配置
export const request: RequestConfig = {
  requestInterceptors: [
    (url, options) => {
      if (!getToken() && history.location.pathname !== '/login') {
        history.replace('/login');
        return { url: '', options: {} };
      }
      return { url, options };
    },
  ],
};