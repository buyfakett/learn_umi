import { UserAPI } from '@/api/user';
import { setToken } from '@/utils/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message, theme } from 'antd';

export default () => {
  const { token } = theme.useToken();
  const username: string = process.env.NODE_ENV !== 'production' ? 'admin' : '';
  const password: string =
    process.env.NODE_ENV !== 'production' ? 'admin123456' : '';
  const remember_me: boolean =
    process.env.NODE_ENV !== 'production';

  const handleSubmit = async (values: any) => {
    try {
      const res = await UserAPI.Login(values);
      if (res.code === 200) {
        // 添加可选链操作和空值检查
        if (res.data?.token) {
          setToken(res.data.token);
          message.success('登录成功');
          history.push('/home');
        } else {
          message.error('登录凭证缺失');
        }
      } else {
        message.error(res.msg || `登录失败，错误码：${res.code}`);
      }
    } catch (error) {
      message.error('登录失败，请重试');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm
            logo="https://img.tteam.icu/i/2024/10/22/xhykcg-3.webp"
            title="hertz"
            subTitle="请登录"
            onFinish={handleSubmit}
          >
            <ProFormText
              name="username"
              initialValue={username}
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              initialValue={password}
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText:
                  '密码应包含数字、字母和特殊字符，长度至少为8个字符。',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok';
                    }
                    if (value && value.length > 6) {
                      return 'pass';
                    }
                    return 'poor';
                  };
                  const status = getStatus();
                  if (status === 'pass') {
                    return (
                      <div style={{ color: token.colorWarning }}>强度：中</div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{ color: token.colorSuccess }}>强度：强</div>
                    );
                  }
                  return (
                    <div style={{ color: token.colorError }}>强度：弱</div>
                  );
                },
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox
                noStyle
                name="remember_me"
                initialValue={remember_me}
              >
                记住我
              </ProFormCheckbox>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
