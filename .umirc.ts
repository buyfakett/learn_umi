import { defineConfig } from "@umijs/max";
let ENV_url: string;

try {
  const { ENV_url: importedUrl } = require('./url.config');
  ENV_url = importedUrl;
} catch (error) {
  // 如果导入文件失败，将 ENV_url 设置为空字符串
  console.error('没有url.config.js文件:', error);
  ENV_url = '';
}


export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data',
  },
  proxy: {
    '/api': {
      target: ENV_url,
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  layout: {
    title: "hertz",
  },
  routes: [
    {
      name: "登录",
      path: "/login",
      component: "./Login",
      layout: false,
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "首页",
      path: "/home",
      component: "./Home",
    },
    {
      name: "权限演示",
      path: "/access",
      component: "./Access",
    },
    {
      name: " CRUD 示例",
      path: "/table",
      component: "./Table",
    },
  ],

  npmClient: "pnpm",
  tailwindcss: {},
  mako: {},
});
