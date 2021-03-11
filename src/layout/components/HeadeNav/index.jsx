import React from 'react';
import { NavLink } from 'umi';
import './style.less';

const routes = [
  {
    path: '/video',
    title: '视频监控',
    children: [
      {
        path: '/video/live',
        title: '实时监控',
      },
      {
        path: '/video/replay',
        title: '视频回放',
      },
      {
        path: '/video/download',
        title: '下载任务',
      },
      {
        path: '/video/pics',
        title: '图片浏览',
      },
      {
        path: '/video/localVideo',
        title: '本地录像',
      },
    ],
  },
  {
    path: '/events',
    title: '事件管理',
    children: [],
  },
  {
    path: '/setting',
    title: '系统管理',
    children: [],
  },
];

export default function () {
  return (
    <header className="header-nav">
      <div className="nav-logo">
        <i className="logo-img"></i>
        <span>安防综合管理平台</span>
      </div>
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} className="nav-link" to={route.path}>
            {route.title}
          </NavLink>
        ))}
      </nav>
      <nav className="sub-nav">
        <Link className="sub-link" to="/video/live">
          实时监控
        </Link>
        <Link className="sub-link" to="/video/replay">
          视频回放
        </Link>
        <Link className="sub-link" to="/video/download">
          下载任务
        </Link>
        <Link className="sub-link" to="/video/pics">
          图片浏览
        </Link>
        <Link className="sub-link" to="/video/localVideo">
          本地录像
        </Link>
      </nav>
    </header>
  );
}
