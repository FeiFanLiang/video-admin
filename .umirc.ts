import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    //dark: true,
  },
  routes: [
    { path: '/login', component: '@/pages/login/index' },
    {
      path: '/',
      component: '@/layout/index',
      wrappers: ['@/layout/components/Wrap/index'],
      routes: [
        {
          path: '/',
          redirect: '/video/live/index',
        },
        {
          path: '/video/live',
          component: '@/pages/LiveBroadcast/index',
        },
      ],
    },
  ],
  dva: {
    immer: true,
  },
  proxy: {
    '/api': {
      target: 'http://119.18.207.153:9997',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/test123': {
      target: 'http://47.94.90.247:555/test123/',
      changeOrigin: true,
      pathRewrite: { '^/test123': '' },
    },
  },
  fastRefresh: {},
});
