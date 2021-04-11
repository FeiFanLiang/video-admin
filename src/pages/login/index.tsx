import React, { FC } from 'react';
import './login.less';
import { Form, Input, Button, message } from 'antd';
import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { connect, Dispatch, History, Loading } from 'umi';

interface FormModel {
  user: string;
  pwd: string;
}

function LoginPage({
  loading,
  dispatch,
  history,
}: {
  loading: boolean;
  dispatch: Dispatch;
  history: History;
}) {
  const onFinish = (form: FormModel) => {
    dispatch({
      type: 'global/login',
      payload: { form },
    }).then(() => {
      message.success('登录成功');
      history.push('/');
    });
  };

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
                  <Input
                    size="large"
                    prefix={
                      <UserOutlined
                        style={{ color: '#00D5FF' }}
                        className="site-form-item-icon"
                      />
                    }
                  />
                </Form.Item>
                <Form.Item name="pwd">
                  <Input.Password
                    prefix={<UnlockOutlined style={{ color: '#00D5FF' }} />}
                    size="large"
                  />
                </Form.Item>
                <Button size="large" htmlType="submit" block loading={loading}>
                  登录
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ loading }: { loading: Loading }) => {
  return {
    loading: loading.effects['global/login'],
  };
};

export default connect(mapStateToProps)(LoginPage as FC);
