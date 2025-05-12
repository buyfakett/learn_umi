import UpdateUserModal from '@/components/App/updateUser';
import useUpdateUserStore from '@/stores/updateUserHandler';
import { getToken, getUsername, removeToken } from '@/utils/auth';
import { UserOutlined } from '@ant-design/icons';
import { RequestConfig, history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Dropdown, Space, message } from 'antd';
import React, { useEffect } from 'react';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  loading: boolean;
}> {
  const { pathname } = history.location;

  // 初始化时检查路径
  if (!getToken() && pathname !== '/login') {
    setTimeout(() => {
      history.replace('/login');
    }, 10);
  }

  return {
    name: '@umijs/max',
    loading: true,
  };
}

export const layout = () => {
  useEffect(() => {
    const unlisten = history.listen(({ location }) => {
      const { pathname } = location;

      // 立即检查路径，覆盖所有可能的跳转
      if (!getToken() && pathname !== '/login') {
        history.replace('/login');
      }
    });

    return () => unlisten();
  }, []);

  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightContentRender: (props: { children?: React.ReactNode }) => {
      const username = getUsername();
      const setUpdateUserHandler = useUpdateUserStore((state) => state.setOpen);
      const items: MenuProps['items'] = [
        {
          key: 'update_user',
          label: (
            <span
              onClick={() => {
                setUpdateUserHandler(true);
              }}
            >
              修改用户信息
            </span>
          ),
        },
        {
          key: 'logout',
          label: (
            <span
              onClick={() => {
                removeToken();
                message.success('退出登录成功');
                history.push('/login');
              }}
            >
              退出登录
            </span>
          ),
        },
      ];
      const dropdown = (
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: 'pointer', padding: '8px 16px' }}>
            <UserOutlined />
            <span>{username}</span>
          </Space>
        </Dropdown>
      );

      return (
        <>
          {dropdown}
          <UpdateUserModal />
        </>
      );
    },
  };
};

// 请求拦截器配置
export const request: RequestConfig = {
  responseInterceptors: [
    (response) => {
      if (response.status === 401) {
        removeToken();
        history.replace('/login');
      }
      return response;
    },
  ],
  requestInterceptors: [
    (url, options) => {
      const token = getToken();
      if (!token && history.location.pathname !== '/login') {
        // 仅返回空请求，不再主动跳转
        return { url: '', options: {} };
      }
      // 添加Authorization头
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
      return { url, options };
    },
  ],
};
