import React from 'react';
import './login.less';
import {Form,Input,Button} from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

export default function() {
    return (
        <section className="layout">
            <div className="login-form-wrap">
                <div className="title"></div>
                <div className="form-container">
                    <div className="form-icon"></div>
                    <div className="line"></div>
                    <div className="form-box">
                        <h5>用户登录</h5>
                        <div className="form">
                            <Form>
                                <Form.Item name="username">
                                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item name="password">
                                    <Input.Password size="large" />
                                </Form.Item>
                                <Button size="large" block>登录</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}