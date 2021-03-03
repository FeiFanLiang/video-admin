import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd:{
    dark:true
  },
  routes: [
    {path:'/login',component:'@/pages/login'},
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
