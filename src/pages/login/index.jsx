import React from 'react';
import './login.less';
import {Form,Input,Button,message} from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import {connect} from 'umi';



 function LoginPage ({loading,dispatch,history}) {
    
    const onFinish = (form) => {
        dispatch({
            type:'global/login',
            payload:{form}
        }).then(() => {
            message.success('登录成功')
            history.push('/')
        })
    }

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
                            <Form onFinish={onFinish}>
                                <Form.Item name="user">
                                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>
                                <Form.Item name="pwd">
                                    <Input.Password size="large" />
                                </Form.Item>
                                <Button size="large" htmlType="submit" block loading={loading}>登录</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = ({loading}) => {
    return {
        loading:loading.effects['global/login']
    }
}

export default connect(mapStateToProps)(LoginPage)