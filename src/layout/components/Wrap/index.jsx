import React from 'react';
import { Redirect, connect } from 'umi';

const auth = (props) => {
  const { isLogin } = props;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.global.token,
  };
};

export default connect(mapStateToProps)(auth);
