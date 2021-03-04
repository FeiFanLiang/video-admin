import React from 'react';
import {Link} from 'umi';
import './style.less';

export default function() {
    return (
        <header className="header-nav">
            <div className="nav-logo">
                <i className="logo-img"></i>
                <span>
                安防综合管理平台
                </span>
            </div>
            <nav>
                <Link className="nav-link active">视频监控</Link>
                <Link className="nav-link">事件管理</Link>
                <Link className="nav-link">系统管理</Link>
            </nav>
            <nav className="sub-nav">
                <Link className="sub-link">
                    实时监控
                </Link>
                <Link className="sub-link">
                    视频回放
                </Link>
                <Link className="sub-link">
                    下载任务
                </Link>
                <Link className="sub-link">
                    图片浏览
                </Link>
                <Link className="sub-link">
                    本地录像
                </Link>
            </nav>
        </header>
    )
}