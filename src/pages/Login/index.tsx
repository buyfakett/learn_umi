import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginForm, ProConfigProvider, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { theme } from 'antd';

export default () => {
  const {token} = theme.useToken();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ProConfigProvider hashed={false}>
        <div style={{backgroundColor: token.colorBgContainer}}>
          <LoginForm
            logo="https://img.tteam.icu/i/2024/10/22/xhykcg-3.webp"
            title="hertz"
            subTitle="请登录"
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'}/>,
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
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
                strengthText:
                  '密码应包含数字、字母和特殊字符，长度至少为8个字符。',
                statusRender: ( value ) => {
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
                      <div style={{color: token.colorWarning}}>
                        强度：中
                      </div>
                    );
                  }
                  if (status === 'ok') {
                    return (
                      <div style={{color: token.colorSuccess}}>
                        强度：强
                      </div>
                    );
                  }
                  return (
                    <div style={{color: token.colorError}}>强度：弱</div>
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
              <ProFormCheckbox noStyle name="autoLogin">
                记住我
              </ProFormCheckbox>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
