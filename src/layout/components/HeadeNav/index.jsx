import React, { useState } from 'react';
import { NavLink } from 'umi';
import { useRouteMatch } from 'react-router-dom';
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

export default function (props) {
  const [subRoutes, setSubRoutes] = useState([]);
  const [subLinkShow, setLinkShow] = useState(false);

  const handleMoveRoute = (route) => {
    setLinkShow(true);
    setSubRoutes(route.children);
  };

  return (
    <header className="header-nav" onMouseLeave={() => setLinkShow(false)}>
      <div className="nav-logo">
        <i className="logo-img"></i>
        <span>安防综合管理平台</span>
      </div>
      <nav>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            onMouseEnter={() => {
              handleMoveRoute(route);
            }}
            className="nav-link"
            activeClassName="active"
            to={route.path}
          >
            {route.title}
          </NavLink>
        ))}
      </nav>
      {subLinkShow ? (
        <div className="sub-nav-wrap">
          <nav className="sub-nav">
            {subRoutes.map((subRoute) => (
              <NavLink
                key={subRoute.path}
                className="sub-link"
                to={subRoute.path}
              >
                {subRoute.title}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
